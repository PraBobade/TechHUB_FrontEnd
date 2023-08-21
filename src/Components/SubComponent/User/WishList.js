import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserMenu from '../Menu/UserMenu'
import ViewContext from '../../../Context/ViewContext'
import Layout from '../../Layout/Layout'
import ProductContext from '../../../Context/Product'

export default function WishList() {
    const { View } = useContext(ViewContext);
    const { LikeProducts, DislikeProduct, AddProductToCart, ConvertToINR } = useContext(ProductContext);

    return (
        <>
            <Layout title={'Liked Product - TechHub'}>
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
                    <div className="content-grid appfont">
                        <div className="Form-Heading">
                            My wish list
                        </div>
                        <hr className='FormHR' />
                        {
                            LikeProducts.length === 0 ? <div className="No-Item-Present">
                                Your wish list is empty....!
                            </div> :
                                <div className="Product-List ">
                                    {LikeProducts?.slice(0).reverse().map((product, index) => {
                                        return (
                                            <div key={index} className="Each-Product card">
                                                <div className="product-img">
                                                    <img className='product-img-size' src={`http://localhost:5002/api/v1/product/product-photo/${product._id}`} alt={product.name} />
                                                    <div className="Like-Product">
                                                        <i onClick={() => { DislikeProduct(product) }} className="fa-solid fa-heart" style={{ color: "#f1092c" }} />
                                                    </div>
                                                </div>
                                                <Link to={`/product/${product.slug}`} className="product-body">
                                                    <div className="product-model-rating">
                                                        <span className='product-model'>Model {product?.model}</span>
                                                        <span className='product-rating '><i className="fa-solid fa-star fa-2xs" />4+</span>
                                                    </div>

                                                    <div className="product-name">{product?.name}</div>
                                                    <div className="product-price">
                                                        <span className="New-Price">
                                                            {ConvertToINR(product.price)}
                                                        </span>
                                                        <span className="Old-Price">
                                                            {ConvertToINR(product.price + 100)}
                                                        </span>
                                                    </div>
                                                    {product?.availability === 'Out Of Stock' &&
                                                        <div className="Product-Availability">
                                                            {product?.availability}
                                                        </div>}
                                                    <div className="product-description">{product?.description[0]}</div>
                                                </Link>
                                                <div className='Product-button' >
                                                    <button onClick={() => { AddProductToCart(product) }} className="Add-to-cart-btn" disabled={product?.availability === 'Out Of Stock'}>Add to Cart</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                        }


                    </div>
                </div>
            </Layout>
        </>

    )
}