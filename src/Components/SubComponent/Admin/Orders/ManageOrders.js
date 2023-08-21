import React, { useContext } from 'react'
import AdminMenu from '../../Menu/AdminMenu'
import Layout from '../../../Layout/Layout'

import ViewContext from '../../../../Context/ViewContext'
import Sub_ManageOrder from './Sub_ManageOrder'

export default function ManageOrders() {

    const { View } = useContext(ViewContext);

    return (
        <Layout title={"Manage Orders - TechHub"}>
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
                    <Sub_ManageOrder />
                </div>
            </div>
        </Layout >
    )
}
