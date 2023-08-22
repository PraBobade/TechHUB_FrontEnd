import { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Spinner from './Spinner.js'
import AuthContext from "../../../Context/AuthContext.js";

export default function AdminPrivateRoute() {
    const { AdminPrivateRoutes, Auth } = useContext(AuthContext)
    const [ok, setOk] = useState(Auth?.isAdmin);

    async function AuthCheck() {
        console.log("Authc is checking....", Auth?.isAdmin);
        const Result = await AdminPrivateRoutes();
        if (Result) {
            setOk(true);
            console.log("Authc is checking completed.", Auth?.isAdmin);
            return true
        }
        else {
            setOk(false);
            return false
        };
    };


    useEffect(() => {
        console.log('UseEffect in Authcheck...');
        AuthCheck();
    }, [])

    return (
        ok ? <Outlet /> : <Spinner />
    )
    // If {ok === true} then the child Routers (Outlet) inside the <PrivateRoutes> will render, else Spinner is shown
}