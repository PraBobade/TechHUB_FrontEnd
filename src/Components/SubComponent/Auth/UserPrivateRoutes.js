import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Spinner from './Spinner.js'
import AuthContext from "../../../Context/AuthContext.js";


export default function UserPrivateRoute() {
    const { UsersPrivateRoutes } = useContext(AuthContext);
    const [ok, setOk] = useState(null);

    async function AuthCheck() {
        const Result = await UsersPrivateRoutes();
        if (Result) {
            setOk(true);
        }
        else {
            setOk(false);
        };
    };

    useEffect(() => {
        AuthCheck();
    }, []);

    if (ok === null) {
        return null;
    }

    return ok ? <Outlet /> : <Spinner />;

    // If {ok === true} then the child Routers (Outlet) inside the <UserPrivateRoutes> will render, else Spinner is shown
}
