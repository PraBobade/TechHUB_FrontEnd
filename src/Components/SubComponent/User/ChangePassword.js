import React, { useContext } from 'react'
import Layout from '../../Layout/Layout';
import UserMenu from '../Menu/UserMenu';
import ChangeUserPassword from '../Admin/Admin Panel/Helper/Sub_ChangePassword';
import ViewContext from '../../../Context/ViewContext';

export default function ChangePassword() {
    const { View } = useContext(ViewContext);

    return (
        <Layout title={`Change Password - TechHub`}>
            <div className="grid-container">
                {!View &&
                    <div className="Mobile-Menu">
                        <div className="Mobile-Menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                            <i className="Mobile-Menu-Icon fa-solid fa-bars" />
                        </div>
                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-body">
                                <UserMenu />
                            </div>
                        </div>
                    </div>}
                {View &&
                    <div className="Computer-Menu">
                        <UserMenu />
                    </div>
                }
                <div className="content-grid">
                    <ChangeUserPassword />
                </div>
            </div>
        </Layout>
    )
}
