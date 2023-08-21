import React, { useState, useContext } from 'react'
import Layout from '../../Layout/Layout.js'
import Load from '../../../Public/Images/load.gif'
import { Link } from 'react-router-dom';
import '../../../Public/Css/Auth/Auth.css'
import AuthContext from '../../../Context/AuthContext.js';

const ForgotPassword = () => {
    const { ForgotUserPassword } = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const [helpers, setHelpers] = useState({ loading: false, successMessage: false })
    const { loading, successMessage } = helpers

    async function handleSubmit(event) {
        event.preventDefault();
        setHelpers({ ...helpers, loading: true })
        const Result = await ForgotUserPassword(email);
        if (Result) {
            setHelpers({ loading: false, successMessage: true });
        } else {
            setHelpers({ ...helpers, loading: false });
        }
    }

    return (
        <>
            <Layout title={"Login - Grocery Store"}>
                <div className='AuthPage VH-Center appfont'>
                    <div className="AuthBox">
                        <h4 className='Auth-heading'>Forgot Password</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="Auth-input">
                                <input type="email" value={email} onChange={(event) => { setEmail(event.target.value) }}
                                    className="Auth-input-field form-control" id="exampleInputEmail" placeholder="Email" required />
                            </div>
                            {successMessage &&
                                <div className='Success-Message'>
                                    <p>
                                        'Password Reset Link is send to your Email address please check your Email Address'
                                    </p>
                                </div>
                            }
                            {loading &&
                                <div className='text-center'>
                                    <img style={{ height: "25px", width: "25px" }} src={Load} alt="Description of the image" />
                                </div>
                            }
                            <div className="AuthSubmit" style={{ textAlign: "center" }}>
                                <button id='btntext' type="submit" className="AuthSubmit-btn" disabled={loading}>
                                    {successMessage ? "Send Link Again" : 'Send Link'}
                                </button>
                            </div>
                            <div className="forgot-password">
                                <Link to="/login" className="text-muted" role="button">{'\u2190 '} Log in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ForgotPassword
