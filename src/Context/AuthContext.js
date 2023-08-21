import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL

const AuthContext = createContext();

export function AuthenticationState(props) {
    const LocalAuth = localStorage.getItem(`Auth`);
    const [Auth, setAuth] = useState({ user: ``, token: ``, isAdmin: false });

    /*${BASE_URL}*/

    async function GetAuthInfo() {
        if (LocalAuth) {
            const ParsedData = JSON.parse(LocalAuth);
            setAuth({ user: ParsedData.user, token: ParsedData.token, isAdmin: (ParsedData.user.role === 'Admin') });
            return ParsedData.token
        } else {
            setAuth({ user: ``, token: ``, isAdmin: 'false' });
            return ''
        }
    }

    async function SetAuthInfo(user, token) {
        localStorage.setItem(`Auth`, JSON.stringify({ user, token }));
        await GetAuthInfo();
    }
    async function RegisterAdmin(AdminDetails) {
        const { name, role, password, email, phone } = AdminDetails;
        const Result = await axios.post(`${BASE_URL}/api/v1/auth/register`, { name, role, password, email, phone });
        if (Result.data.status === 'Pass') {
            toast.success(Result.data.message);
            return true
        } else {
            toast.error(Result.data.message);
        }
    }
    async function RegisterUser(UserDetails) {
        const { name, role, password, email, phone, confirm_pass } = UserDetails;
        if (password === confirm_pass) {
            const Result = await axios.post(`${BASE_URL}/api/v1/auth/register`, { name, role, password, email, phone });
            if (Result?.data?.status === `Pass`) {
                toast.success(Result?.data?.message);
                return true
            } else {
                toast.error(Result?.data?.message);
            }
        } else {
            toast.error(`Password And Confirm Password Not Match`)
        }
    }

    async function UpdateUserAccount(UpdatedDetails) {
        const { UpdatedName, UpdatedEmail, UpdatedPhone, UpdatedAddress } = UpdatedDetails
        try {
            const Result = await axios.put(`${BASE_URL}/api/v1/auth/update-user`, {
                name: UpdatedName, email: UpdatedEmail, phone: UpdatedPhone,
                address: {
                    city: UpdatedAddress?.city,
                    state: UpdatedAddress?.state,
                    country: UpdatedAddress?.country,
                    pin: UpdatedAddress?.pin,
                    complete_address: UpdatedAddress?.complete_address
                }
            },
                { headers: { Authorization: `Bearer ` + Auth?.token } });
            if (Result?.data?.status === `Pass`) {
                SetAuthInfo(Result?.data?.user, Auth?.token);
                toast.success(Result?.data?.message);
                return true
            } else {
                toast.error(Result?.data?.message);
                return false
            }
        } catch (error) {
            toast.error(`Error in Updated User Details Context`)
        }
    }

    async function Login(LoginDetails) {
        const { email, password } = LoginDetails
        const Result = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email, password });
        if (Result?.data?.status === `Pass`) {
            SetAuthInfo(Result?.data?.user, Result?.data?.token);
            toast.success(Result?.data?.message);
            return true
        } else {
            toast.error(Result?.data?.message);
        }
    }

    //this check the User is loged or Not.
    async function UsersPrivateRoutes() {
        const Result = await axios.get(`${BASE_URL}/api/v1/auth/user-auth`, {
            headers: { Authorization: `Bearer ` + await GetAuthInfo() }
        });
        if (Result?.data?.status === `Pass`) {
            return true
        }
        else {
            return false
        }
    }
    async function AdminPrivateRoutes() {
        const Result = await axios.get(`${BASE_URL}/api/v1/auth/admin-auth`, {
            headers: { Authorization: `Bearer ` + await GetAuthInfo() }
        });
        if (Result?.data?.status === `Pass`) {
            return true
        }
        else {
            return false
        }
    }

    async function LogOut() {
        SetAuthInfo(``, ``);
        toast.success(`Log out Successfully..!`);
        return true
    }

    async function ForgotUserPassword(email) {
        const Result = await axios.post(`${BASE_URL}/api/v1/auth/send-reset-password-link`, { email });
        if (Result?.data?.status === `Pass`) {
            toast.success(Result?.data?.message);
            return true
        } else {
            toast.error(Result?.data?.message);
        }
    }

    async function ResetUserPassword(Details) {
        const { token, password, confirm_pass } = Details
        const Result = await axios.post(`${BASE_URL}/api/v1/auth/reset-password/${token}`, { password, confirm_pass });
        if (Result?.data?.status === `Pass`) {
            toast.success(Result?.data?.message);
            return true
        } else {
            toast.error(Result?.data?.message);
        }
    }

    async function ChangeUserPassword(pass) {
        const { password, confirm_pass } = pass
        const Result = await axios.put(`${BASE_URL}/api/v1/auth/change-password`, { password, confirm_pass }, { headers: { Authorization: `Bearer ` + Auth?.token } })
        if (Result?.data?.status === `Pass`) {
            toast.success(Result?.data?.message);
            return true
        } else {
            toast.error(Result?.data?.message);
            return false
        }
    }

    const [AllUserList, SetAllUserList] = useState([]);
    async function GetAllUsers() {
        const Result = await axios.get(`${BASE_URL}/api/v1/auth/get-all-users`,
            { headers: { Authorization: `Bearer ` + Auth?.token } });
        if (Result?.data?.status === `Pass`) {
            SetAllUserList(Result?.data?.users);
        } else {
            toast.error(`Error in Fetching Users List`);
        }
    }

    async function DeleteUser(Id) {
        const Result = await axios.post(`${BASE_URL}/api/v1/auth/delete-user`, { userId: Id },
            { headers: { Authorization: (`Bearer ` + Auth?.token) } });
        if (Result?.data?.status === `Pass`) {
            GetAllUsers()
            toast.success(`The User Deleted Successfully`)
        } else {
            toast.error(`Error in Deleting User`)
        }
    }


    useEffect(() => {
        GetAuthInfo();
    }, [LocalAuth]);

    return (
        <AuthContext.Provider value={{
            Auth, Login, LogOut,
            GetAllUsers, AllUserList,
            RegisterAdmin,
            RegisterUser, UpdateUserAccount, DeleteUser,
            ForgotUserPassword, ResetUserPassword, ChangeUserPassword,
            UsersPrivateRoutes, AdminPrivateRoutes
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext