import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import ProductContext from '../../../../../Context/Product';
import '../../../../../Public/Css/Product/UserProduct.css'


const BASE_URL = process.env.REACT_APP_BASE_URL
export default function HomeContent({ Products }) {

    const { LikeProducts, AddLikeProduct, DislikeProduct, AddProductToCart, ConvertToINR } = useContext(ProductContext);

    return (
        <div className="Product-List appfont">
            {Products?.slice(0).reverse().map((product, index) => {
                return (
                    <div key={index} className="Each-Product card">
                        <div className="product-img">
                            <img className='product-img-size' src={`${BASE_URL}/api/v1/product/product-photo/${product?._id}`} alt={product?.name} />
                            <div className="Like-Product">
                                {LikeProducts.some((item) => item?._id === product?._id) ?
                                    <i onClick={() => { DislikeProduct(product) }} className="fa-solid fa-heart" style={{ color: "#f1092c" }} /> :
                                    <i onClick={() => { AddLikeProduct(product) }} className="fa-regular fa-heart" />
                                }
                            </div>
                        </div>
                        <Link to={`/product/${product?.slug}`} className="product-body">
                            <div className="product-model-rating">
                                <span className='product-model'>Model {product?.model}</span>
                                <span className='product-rating '><i className="fa-solid fa-star fa-2xs" />4+</span>
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
                        <div className='Product-button' >
                            <button onClick={() => { AddProductToCart(product) }} className="Add-to-cart-btn" disabled={product?.availability === 'Out Of Stock'}>Add to Cart</button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
