import React, { useContext, useEffect } from 'react'
import AuthContext from '../../../../../Context/AuthContext'
import '../../../../../Public/Css/Menu-Content/AdminUserList.css'

export default function List() {
    const { AllUserList, GetAllUsers, DeleteUser } = useContext(AuthContext);

    async function handleDelete(id) {
        await DeleteUser(id);
    }

    useEffect(() => {
        GetAllUsers();
    }, [])
    return (
        <>
            <div className="Form-Heading">
                Users
            </div>
            <hr className='FormHR' />
            <div className="UserTable appfont">
                <table className="table table-hover">
                    <thead className="table-head">
                        <tr>
                            <th className='table-Heading' scope="col">#</th>
                            <th className='table-Heading' scope="col">Name</th>
                            <th className='table-Heading' scope="col">Email</th>
                            <th className='table-Heading' scope="col">Number</th>
                            <th className='table-Heading' scope="col">Address</th>
                            <th className='table-Heading' scope="col">Role</th>
                            <th className='table-Heading' scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AllUserList?.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th className='table-Fields' scope="row">{index + 1}</th>
                                    <td className='table-Fields'>{user.name}</td>
                                    <td className='table-Fields'>{user.email}</td>
                                    <td className='table-Fields'>{user.phone}</td>
                                    <td className='table-Fields'>{user.address.city},{user.address.state}</td>
                                    <td className='table-Fields'>{user.role}</td>
                                    {user.name !== "PRADIP DILIP BOBADE" &&
                                        <td><button onClick={() => { handleDelete(user._id) }} className='DeleteUser'>Delete</button></td>
                                    }
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}
