import React, { useContext } from 'react'
import Layout from "../../../../Layout/Layout.js";
import UsersProductList from '../Helper/UsersProductList.js'
import Filter from '../../../Menu/Filter.js';
import ProductContext from '../../../../../Context/Product.js';
import '../../../../../Public/Css/Menu/MenuAndContent.css'
import ViewContext from '../../../../../Context/ViewContext.js';

export default function HomePage() {
    const { FilteredResult } = useContext(ProductContext);
    const { View } = useContext(ViewContext);

    return (
        <Layout title={"TechHUB"}>
            <div className="grid-container">
                {!View &&
                    <div className="Mobile-Menu">
                        <div className="Mobile-Menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                            <i className="Mobile-Menu-Icon fa-solid fa-filter" />
                        </div>
                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-body">
                                <Filter />
                            </div>
                        </div>
                    </div>}
                {View &&
                    <div className="Computer-Menu">
                        <Filter />
                    </div>
                }
                <div className="content-grid">
                    <div className="No-Item-Present" style={{ margin: "5px 0px", }}>
                        {FilteredResult.length === 0 && 'No Result Found'}
                    </div>
                    <UsersProductList Products={FilteredResult} />
                </div>
            </div>
        </Layout>
    )
}