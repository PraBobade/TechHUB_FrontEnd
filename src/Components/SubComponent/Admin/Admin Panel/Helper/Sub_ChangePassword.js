import React, { useState, useContext } from 'react'
import AuthContext from '../../../../../Context/AuthContext';

export default function ChangePassword() {
    const { ChangeUserPassword } = useContext(AuthContext);
    const [pass, setPass] = useState({ password: '', confirm_pass: '' })
    const { password, confirm_pass } = pass
    const [hidePassword, sethidePassword] = useState("password");

    async function handleSubmit(event) {
        event.preventDefault();
        await ChangeUserPassword(pass);
    }
    return (
        <div className="AuthPage appfont">
            <div className="AuthBox">
                <h4 className='Auth-heading'>CHANGE PASSWORD</h4>
                <form onSubmit={handleSubmit}>
                    <div className="Auth-input">
                        <input className="Auth-input-field form-control"
                            value={password} placeholder='Password'
                            onChange={(event) => { setPass({ ...pass, password: event.target.value }) }}
                            type={hidePassword} required />
                    </div>
                    <div className="Auth-input">
                        <input className="Auth-input-field form-control"
                            value={confirm_pass} type={hidePassword}
                            onChange={(event) => { setPass({ ...pass, confirm_pass: event.target.value }) }}
                            placeholder='Confirm Password' required />
                    </div>
                    <div id='hide-password-element'
                        className="form-check form-switch show-password"
                        onClick={() => { sethidePassword(hidePassword === 'password' ? 'text' : 'password') }}>
                        <input className="form-check-input" type="checkbox" role="switch"
                            id="hidePassword" />
                        <label className="form-check-label" htmlFor="hidePassword">Show Password</label>
                    </div>
                    <div className="AuthSubmit">
                        <button type="submit" className="AuthSubmit-btn">Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
