
import React, { useState, useContext } from 'react'
import Layout from '../../Layout/Layout.js'
import { useParams, useNavigate } from 'react-router-dom'
import '../../../Public/Css/Auth/Auth.css'
import Load from '../../../Public/Images/load.gif'
import AuthContext from '../../../Context/AuthContext.js';

const ResetPassword = () => {
    const { token } = useParams();
    const { ResetUserPassword } = useContext(AuthContext);

    const [ResetDetails, setResetDetails] = useState({ password: "", confirm_pass: '', token });
    const { password, confirm_pass } = ResetDetails

    const [helpers, setHelpers] = useState({ showPassword: 'password', loading: false });
    const { showPassword, loading } = helpers

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setHelpers({ ...helpers, loading: true })
        const Result = await ResetUserPassword(ResetDetails);
        if (Result) {
            navigate('/login');
        }
        setHelpers({ ...helpers, loading: false });
    }
    return (
        <>
            <Layout title={"Reset Password - Grocery Store"}>
                <div className='AuthPage VH-Center appfont'>
                    <div className="AuthBox">
                        <h4 className='Auth-heading'>Reset Password</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="Auth-input">
                                <input type={showPassword} value={password}
                                    onChange={(event) => { setResetDetails({ ...ResetDetails, password: event.target.value }) }}
                                    className="Auth-input-field form-control"
                                    placeholder="Password" required />
                            </div>
                            <div className="Auth-input">
                                <input type={showPassword} value={confirm_pass}
                                    onChange={(event) => { setResetDetails({ ...ResetDetails, confirm_pass: event.target.value }) }}
                                    className="Auth-input-field form-control" placeholder="Confirm Password" required />
                            </div>

                            <div className="form-check form-switch show-password"
                                onClick={() => setHelpers({ ...helpers, showPassword: showPassword === "password" ? "text" : "password" })}>
                                <input className="form-check-input" type="checkbox" role="switch" id="hidePassword" />
                                <label className="form-check-label" htmlFor="hidePassword">Show Password</label>
                            </div>

                            {loading &&
                                <div className='text-center'>
                                    <img style={{ height: "25px", width: "25px" }} src={Load} alt="Description of the image" />
                                </div>
                            }
                            <div className="AuthSubmit">
                                <button type="submit" className="AuthSubmit-btn" disabled={loading}>Reset Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ResetPassword
