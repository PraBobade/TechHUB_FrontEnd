import React, { useContext } from 'react'
import AdminMenu from '../../../Menu/AdminMenu';
import Layout from '../../../../Layout/Layout'
import Sub_EditProduct from './Sub_EditProduct';
import { useParams } from 'react-router-dom';
import ViewContext from '../../../../../Context/ViewContext';



export default function AdminProductDetails() {
    const { View } = useContext(ViewContext);
    const params = useParams();
    return (
        <Layout title={"Edit Product - TechHub"}>
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
                    <Sub_EditProduct slug={params.slug} />
                </div>
            </div>
        </Layout >

    )
}
