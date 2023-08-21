import React, { useContext } from 'react'
import Layout from '../../../Layout/Layout'
import AdminMenu from '../../Menu/AdminMenu'
import List from './helper/List'
import ViewContext from '../../../../Context/ViewContext'


export default function UsersList() {
    const { View } = useContext(ViewContext);

    return (
        <Layout title={"Admin Dashboard - TechHub"}>
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
                    <List />
                    <hr className='FormHR' />
                </div>
            </div>
        </Layout>

    )
}
