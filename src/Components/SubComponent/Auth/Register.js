import React, { useState, useContext } from 'react'
import Layout from '../../Layout/Layout.js'
import { useNavigate } from 'react-router-dom';
import '../../../Public/Css/Auth/Auth.css'
import AuthContext from '../../../Context/AuthContext.js';

export default function Register() {
    const { RegisterUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setloading] = useState(false)

    const [User, setUser] = useState({ name: "", password: "", role: "User", email: "", phone: "", confirm_pass: '' });
    const { name, password, email, phone, confirm_pass } = User;
    const [showPassword, setShowPassword] = useState("password");

    async function handleSubmit(event) {
        setloading(true);
        event.preventDefault();
        const Result = await RegisterUser(User);
        setloading(false);
        if (Result) {
            navigate('/login')
        }
    }
    return (
        <>
            <Layout title={"Register - MyTech Hub"}>
                <div className='AuthPage VH-Center appfont'>
                    <div className="AuthBox">
                        <h4 className='Auth-heading'>REGISTER USER</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="Auth-input">
                                <input type="text" value={name} onChange={(event) => { setUser({ ...User, name: event.target.value }) }}
                                    className="Auth-input-field form-control" placeholder="User Name" required />
                            </div>

                            <div className="Auth-input">
                                <input type="email" value={email} onChange={(event) => { setUser({ ...User, email: event.target.value }) }}
                                    className="Auth-input-field form-control" placeholder="Email" required />
                            </div>

                            <div className="Auth-input">
                                <input type="number" value={phone} onChange={(event) => { setUser({ ...User, phone: event.target.value }) }}
                                    className="Auth-input-field form-control" placeholder="Enter 10 Digit Mobile Number" required />
                            </div>
                            <div className="Auth-input">
                                <input type={showPassword} value={password}
                                    onChange={(event) => { setUser({ ...User, password: event.target.value }) }}
                                    className="Auth-input-field form-control" placeholder="Password" required />
                            </div>
                            <div className="Auth-input">
                                <input type={showPassword} value={confirm_pass}
                                    onChange={(event) => { setUser({ ...User, confirm_pass: event.target.value }) }}
                                    className="form-control Auth-input-field" placeholder="Confirm Password" required />
                            </div>

                            <div className="form-check form-switch show-password"
                                onClick={() => { setShowPassword(showPassword === 'text' ? 'password' : 'text') }}>
                                <input className="form-check-input" type="checkbox" role="switch" id="hidePassword" />
                                <label className="form-check-label" htmlFor="hidePassword">Show Password</label>
                            </div>

                            <div className="AuthSubmit">
                                <button type="submit" className="AuthSubmit-btn" disabled={loading}>
                                    {loading ?
                                        <i className="fa-solid fa-spinner fa-spin-pulse" />
                                        : <>Register</>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
