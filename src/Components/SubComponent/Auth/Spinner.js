import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            navigate('/login', { state: location.pathname });
        }, 500);
        return () => clearInterval(interval);
    }, [location]);

    /* Here we are sending the state as a variable to the navigate and this variable we are using in the login.js this is b'coz suppose when User is Getting a link of dashboard, when he click on that link he should be navigate directly to the dashboard not on Home page so we are getting the location of the user URL path ('/dashboard') before login.  */

    return (
        <div className="d-flex flex-column justify-content-center text-center align-items-center appfont" style={{ height: "70vh" }}>


            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
