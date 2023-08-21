
import React, { useState, useContext } from 'react'
import Layout from '../../../Layout/Layout.js'
import { useNavigate } from 'react-router-dom';
import '../../../../Public/Css/Auth/Auth.css'
import AdminMenu from '../../Menu/AdminMenu.js';
import AuthContext from '../../../../Context/AuthContext.js';
import ViewContext from '../../../../Context/ViewContext.js';
export default function NewAdmin() {
    const { RegisterAdmin, Auth } = useContext(AuthContext);
    const { View } = useContext(ViewContext);
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();

    const [AdminDetails, setAdminDetails] = useState({ name: '', role: 'Admin', password: '', email: '', phone: "" });
    const { name, role, password, email, phone } = AdminDetails;
    const [showPassword, setShowPassword] = useState("password");

    async function handleSubmit(event) {
        setloading(true);
        event.preventDefault();
        const Result = await RegisterAdmin(AdminDetails)
        setloading(false);
        if (Result) {
            navigate(`/admin/${Auth.user.UserID}/dashboard`)
        }

    }

    return (
        <>
            <Layout title={`Add New Admin - TechHub`}>
                <div className="grid-container">
                    {!View &&
                        <div className="Mobile-Menu">
                            <div className="Mobile-Menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                                <i className="Mobile-Menu-Icon fa-solid fa-bars" />
                            </div>
                            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                                <div className="offcanvas-body">
                                    <AdminMenu />
                                </div>
                            </div>
                        </div>}
                    {View &&
                        <div className="Computer-Menu">
                            <AdminMenu />
                        </div>
                    }
                    <div className="content-grid">
                        <div className='AuthPage VH-Center appfont'>
                            <div className="AuthBox">
                                <h4 className='Auth-heading'>REGISTER NEW ADMIN</h4>
                                <form id='registerform' onSubmit={handleSubmit}>
                                    <div className="Auth-input">
                                        <input type="text" value={name}
                                            onChange={(event) => { setAdminDetails({ ...AdminDetails, name: event.target.value }) }}
                                            className="Auth-input-field form-control" id="exampleInputUsername1" placeholder="User Name" required />
                                    </div>
                                    <div className="Auth-input">
                                        <input type="email" value={email}
                                            onChange={(event) => { setAdminDetails({ ...AdminDetails, email: event.target.value }) }}
                                            className="Auth-input-field form-control" id="exampleInputEmail1" placeholder="Email" required />
                                    </div>
                                    <div className="Auth-input">
                                        <input type="text" value={'Role : ' + role}
                                            className="Auth-input-field form-control" id="admin-role" disabled />
                                    </div>
                                    <div className="Auth-input">
                                        <input type="text" value={phone}
                                            onChange={(event) => { setAdminDetails({ ...AdminDetails, phone: event.target.value }) }}
                                            className="Auth-input-field form-control" id="exampleInputPhonenumber1" placeholder="Phone Number" required />
                                    </div>
                                    <div className="Auth-input">
                                        <input type={showPassword} value={password}
                                            onChange={(event) => { setAdminDetails({ ...AdminDetails, password: event.target.value }) }}
                                            className="Auth-input-field form-control" id="exampleInputPassword1" placeholder="Password" required />
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
                                                : <>Add Admin</>
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
