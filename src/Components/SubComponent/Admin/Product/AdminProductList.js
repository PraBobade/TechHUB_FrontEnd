import React, { useContext, useEffect, useState } from 'react'
import AdminMenu from '../../Menu/AdminMenu'
import Layout from '../../../Layout/Layout'
import { Link } from 'react-router-dom';
import ProductContext from '../../../../Context/Product';
import ViewContext from '../../../../Context/ViewContext';
import AuthContext from '../../../../Context/AuthContext';
const BASE_URL = process.env.REACT_APP_BASE_URL




export default function AdminProductList() {
    const [loading, setloading] = useState(false);
    const { DeleteProduct, ConvertToINR, AllCategories, FilterProducts, FilteredResult } = useContext(ProductContext);
    const { Auth } = useContext(AuthContext);
    const { View } = useContext(ViewContext);

    const [FilterFields, setFilterFields] = useState({ category: '', name: '', model: '', availability: '' });

    async function handleSearch() {
        setloading(true);
        await FilterProducts(FilterFields);
        setloading(false);
    }

    useEffect(() => {
        handleSearch()
    }, []);


    return (
        <>
            <Layout title={"View Products - TechHub"}>
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
                    <div className="content-grid appfont">
                        <div className="Filter-Admin-Product">
                            <h5 className="product-name">
                                Filter Product
                            </h5>
                            <div className="Filter-Menu">
                                <div className="Filter-Field">
                                    <input className='Field-Input Filter-Input' id='filter-input' type="text" placeholder='Product Name'
                                        onChange={(event) => {
                                            setFilterFields({ ...FilterFields, name: event.target.value })
                                        }} />
                                </div>
                                <div className="Filter-Field">
                                    <select className="Filter-Select Filter-Input" value={FilterFields.category}
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            if (selectedValue === "Reset") setFilterFields({ ...FilterFields, category: "" });
                                            else setFilterFields({ ...FilterFields, category: selectedValue });
                                        }}>
                                        <option value="Reset">Category</option>
                                        {AllCategories.map((item) => {
                                            return <option className='Order-Info-result' key={item?._id} value={item?._id}>{item?.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="Filter-Field">
                                    <input className='Field-Input Filter-Input' id='filter-input' type="text" placeholder='Model Number'
                                        onChange={(event) => {
                                            setFilterFields({ ...FilterFields, model: event.target.value })
                                        }} />
                                </div>

                                <div className="Filter-Field">
                                    <select className="Filter-Select Filter-Input" value={FilterFields.availability}
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            if (selectedValue === "Reset") setFilterFields({ ...FilterFields, availability: "" });
                                            else setFilterFields({ ...FilterFields, availability: selectedValue });
                                        }}>
                                        <option value="Reset">Avaibality</option>
                                        <option value='Out Of Stock'>In Stock</option>
                                        <option value='In Stock'>Out Of Stock</option>
                                    </select>
                                </div>

                            </div>
                            <div className="Button-Field">
                                <button onClick={handleSearch} className='Form-Save-Button'>
                                    {loading ?
                                        <i className="fa-solid fa-spinner fa-spin-pulse" />
                                        : <>Search</>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="No-Item-Present product-name" style={{ margin: "5px 0px", }}>
                            {FilteredResult.length === 0 ? 'No Result Found' : `${FilteredResult.length} Result Found`}
                        </div>
                        <div className="Product-List">
                            {FilteredResult?.slice(0).reverse().map((product) => {
                                return (
                                    <div key={product?._id} className="Each-Product card">
                                        <div className="product-img">
                                            <img className="product-img-size" src={`${BASE_URL}/api/v1/product/product-photo/${product?._id}`} alt={product?.name} />
                                            <div className="Like-Product Delete-Product" onClick={() => DeleteProduct(product?._id)}>
                                                <i className="fa-solid fa-trash-can" style={{ color: "#f1092c" }} />
                                            </div>
                                        </div>

                                        <Link className='product-body' to={`/admin/${Auth?.user?.UserID}/product-list/${product?.slug}`}>
                                            <div className="product-model-rating">
                                                <span className='product-model'>Model {product?.model}</span>
                                            </div>
                                            <div className="product-name">{product?.name}</div>
                                            <div className="product-price">
                                                <span className="New-Price">
                                                    {ConvertToINR(product?.price)}
                                                </span>
                                                <span className="Old-Price">
                                                    {ConvertToINR(product?.price + 100)}
                                                </span>
                                            </div>
                                            {product?.availability === 'Out Of Stock' &&
                                                <div className="Product-Availability">
                                                    {product?.availability}
                                                </div>}
                                            <div className="product-description">{product?.description[0]}</div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Layout>
        </>


    )
}
