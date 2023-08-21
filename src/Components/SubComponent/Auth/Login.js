import React, { useState, useContext } from 'react'
import Layout from '../../Layout/Layout.js'
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../Public/Css/Auth/Auth.css'
import AuthContext from '../../../Context/AuthContext.js';


export default function Login() {
    const { Login } = useContext(AuthContext);
    const [loginDetail, setloginDetail] = useState({ email: "", password: "" });
    const { email, password } = loginDetail;
    const [loading, setloading] = useState(false);

    const [showPassword, setShowPassword] = useState("password")

    const location = useLocation();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const Result = await Login(loginDetail);
        if (Result) {
            const UrlPath = location.state;
            navigate(UrlPath || '/');
        }
        /* 
        this location.state is from Spinner.js (why we are using location.)state here?   because when click on login submit button it should be navigate to the Home page. but if he has a link of dashboard/cart/anyother then after click on submit he should be navigate to that location not on home page.
    */}
    return (
        <>
            <Layout title={"Login - MyTech Hub"}>
                <div className='AuthPage appfont'>
                    <div className="AuthBox">
                        <h4 className='Auth-heading'>LOGIN</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="Auth-input">
                                <input className="Auth-input-field form-control" type="email" value={email}
                                    onChange={(event) => { setloginDetail({ ...loginDetail, email: event.target.value }) }}
                                    placeholder="Email" required />
                            </div>
                            <div className="Auth-input">
                                <input className="Auth-input-field form-control" type={showPassword} value={password}
                                    onChange={(event) => { setloginDetail({ ...loginDetail, password: event.target.value }) }}
                                    placeholder="Password" required />
                            </div>
                            <div className="form-check form-switch show-password">
                                <input className="form-check-input" type="checkbox" role="switch" id="hidePassword" value={showPassword}
                                    onClick={() => {
                                        setShowPassword(showPassword === 'text' ? 'password' : 'text')
                                    }} autoComplete="current-password" />
                                <label className="form-check-label" htmlFor="hidePassword">Show Password</label>
                            </div>

                            <div className="AuthSubmit" >
                                <button type="submit" className="AuthSubmit-btn" disabled={loading}>
                                    {loading ?
                                        <i className="fa-solid fa-spinner fa-spin-pulse" />
                                        : <>Login</>
                                    }
                                </button>
                            </div>
                            <div className="forgot-password">
                                <a className="text-muted" href="forgot-password">Forgot password?</a>
                            </div>
                        </form>
                    </div>
                </div >
            </Layout >
        </>
    )
}
