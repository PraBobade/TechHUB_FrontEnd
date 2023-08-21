import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../../../../Public/Css/Product/ViewProductDetail.css'
const BASE_URL = process.env.REACT_APP_BASE_URL
export default function ({ product, ConvertToINR, AddToCart, AddLikeProduct, LikeProducts, DislikeProduct }) {
    const navigate = useNavigate();

    async function BuyNow() {
        AddToCart(product);
        navigate('/user/checkout');
    }

    return (
        <div className="Product-Details appfont">
            <div className="Product-Img">
                <img className="Product-Img-size" src={`${BASE_URL}/api/v1/product/product-photo/${product?._id}`} alt={product?.name} />
                <div className="View-Like-Product">
                    {LikeProducts.some((item) => item?._id === product?._id) ?
                        <i onClick={() => { DislikeProduct(product) }} className="view-Product-Heart-Icon fa-solid fa-heart" style={{ color: "#f1092c" }} /> :
                        <i onClick={() => { AddLikeProduct(product) }} className="view-Product-Heart-Icon fa-regular fa-heart" />
                    }
                </div>
            </div>
            <div className="Product-Content">
                <div className="Product-Info">
                    <div className="Product-Name">
                        <span > {product?.name}</span>
                    </div>
                    <hr className="Producthr" />
                    <div className="Product-Price">
                        <span className="new-Price">
                            {ConvertToINR(product?.price)}
                        </span>
                        <span className="old-Price">
                            {ConvertToINR(product?.price + Math.round(product?.price * 39 / 100))}
                        </span>
                        <span className="Discount">
                            39% off
                        </span>
                    </div>
                    <hr className="Producthr" />

                    <div className="Product-Point">Highlight : </div>
                    <div className="Product-Description">
                        {product?.description?.slice(1).map((item, index) => {
                            return <li key={index} className='description-list'>{item}</li>
                        })}
                    </div>
                    <hr className="Producthr" />
                    <div className="More-Detail">
                        <li className="list-points">
                            <span className='list-key'>Brand : </span>
                            <span className='list-value'>{product?.brand}</span>
                        </li>
                        <li className="list-points">
                            <span className='list-key'>Model : </span>
                            <span className='list-value'>{product?.model}</span>
                        </li>
                        <li className="list-points">
                            <span className='list-key'>Rating : </span>
                            <span className='list-value availabilityTrue'><i className="fa-solid fa-star fa-2xs" />4+</span>
                        </li>
                        <li className="list-points">
                            <span className='list-key'>Availability : </span>
                            {product?.availability === 'In Stock' ?
                                <span className='list-value availabilityTrue'>In Stock</span>
                                : <span className='list-value availabilityFalse'>Out Of Stock</span>}
                        </li>
                        <li className="list-points">
                            <span className='list-key'>Seller : </span>
                            <span className='list-value'>FastMan</span>
                        </li>
                    </div>
                    <hr className="Producthr" />
                    <div className='Product-Point'>Available offers :</div>
                    <div className="Product-Offers">
                        <div className="First-Offer">
                            <span className='offer-tag'><i className="fa-solid fa-tags"></i></span>
                            <span className="offer-txt">Flat ₹3,000 Off on HDFC Bank Credit Card </span>
                        </div>
                        <div className="Second-Offer">
                            <span className='offer-tag'><i className="fa-solid fa-tags"></i></span>
                            <span className="offer-txt">Special PriceGet extra ₹5500 off  </span>
                        </div>
                        <div className="Second-Offer">
                            <span className='offer-tag'><i className="fa-solid fa-tags"></i></span>
                            <span className="offer-txt">Bank OfferFlat ₹1,250 Off on ICICI Bank Credit Card   </span>
                        </div>
                    </div>
                    <hr className="Producthr" />


                </div>
                <div className="Product-Cart-btn">
                    <button onClick={BuyNow} className='Buy-Now-btn' disabled={product?.availability === 'Out Of Stock'}>Buy Now</button>
                    <button onClick={() => { AddToCart(product) }} className='Add-to-Cart-btn' disabled={product?.availability === 'Out Of Stock'}>Add to Cart</button>
                </div>
            </div>
            <hr className="Producthr" />
        </div>
    )
}
