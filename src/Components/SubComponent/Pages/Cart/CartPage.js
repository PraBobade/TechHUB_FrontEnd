import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../../../Layout/Layout'
import ProductContext from '../../../../Context/Product';
import AuthContext from '../../../../Context/AuthContext';
import '../../../../Public/Css/Cart/cart.css'
const BASE_URL = process.env.REACT_APP_BASE_URL
export default function CartPage() {
    const { CartProducts, RemoveProductCart, ConvertToINR, SetCartQuntity, } = useContext(ProductContext);
    const { Auth } = useContext(AuthContext)
    const [TotalPrice, setPrice] = useState(0);
    let price = 0;
    async function SetQuantity(Product, quantity) {
        await SetCartQuntity(Product, quantity);
    }
    useEffect(() => {
        setPrice(price);
    }, [CartProducts]);

    return (
        <Layout title={'Cart - TechHub'}>
            <div className="content-grid appfont">
                {CartProducts.length === 0 ?
                    <div className='Form-Heading'>0 Items in Cart</div> :
                    <>
                        <div className='Form-Heading'>{`You Have ${CartProducts.length} Products in Cart`}</div>
                        <div className="CartProductList">
                            {CartProducts?.map((product, index) => {
                                price += product?.price * product?.quantity;
                                return (
                                    <div key={index} className="Each-Cart-Product">
                                        <div className="Order-Image">
                                            <img className="Order-Img-Size" src={`${BASE_URL}/api/v1/product/product-photo/${product?._id}`} />
                                        </div>
                                        <div className='Order-Details'>
                                            <li className="Orders-Info">
                                                <Link style={{ textDecoration: "none", color: "black" }} to={`/product/${product?.slug}`}>
                                                    <span style={{ fontWeight: "bolder" }} className='Order-Info-result'>{product?.name} </span>
                                                </Link>
                                            </li>
                                            <li className="Orders-Info">
                                                <span className='Order-Info-Label'>Unit Price</span>
                                                <span className='Order-Info-result'>{ConvertToINR(product?.price)} </span>
                                            </li>
                                        </div>
                                        <div className="Order-Details ">
                                            <li className="Orders-Info">
                                                <span className='Order-Info-Label'>Qauntity</span>
                                                <span className='Order-Info-result'>
                                                    <button onClick={() => { SetQuantity(product, product?.quantity - 1) }} className="QuantityIcons fa-regular fa-square-minus" disabled={product?.quantity === 1} />{product?.quantity}
                                                    <button onClick={() => { SetQuantity(product, product?.quantity + 1) }} className="QuantityIcons fa-regular fa-square-plus" disabled={product?.quantity === 10} />
                                                </span>
                                            </li>
                                        </div>
                                        <div className="CancelOrder">
                                            <button className='CancelButton' onClick={() => { RemoveProductCart(product) }} >Remove</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='Cart-Coupon'>
                            <div className='Coupon-Info'>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</div>
                            <div className='Panel-Group' id="accordion">
                                <div className="Panel-Item">
                                    <button className="Panel-Button" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Use Coupon Code
                                    </button>
                                    <div id="collapseOne" className="Panel-Content-Cart collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div className="Panel-Body-Content">Enter your coupon here</div>
                                        <div className="Panel-Body-Content">
                                            <input className="Panel-Input" type="text" placeholder='Coupon Code' />
                                        </div>
                                        <button className="Panel-Apply-btn">Apply</button>
                                    </div>
                                </div>
                                <div className="Panel-Item">
                                    <button className="Panel-Button" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Use Gift Certificate
                                    </button>
                                    <div id="collapseTwo" className="Panel-Content-Cart collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div className="Panel-Body-Content">Enter your gift certificate code here</div>
                                        <div className="Panel-Body-Content">
                                            <input className="Panel-Input" type="text" placeholder='Gift Certificate Code' />
                                        </div>
                                        <div className="Panel-Apply-btn">Apply</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="Cart-Table">
                            <table className='Cart-Price-Table'>
                                <tbody>
                                    <tr>
                                        <th className="Table-txt">Sub-Total</th>
                                        <td className="Table-txt">{ConvertToINR(TotalPrice)}</td>
                                    </tr>
                                    <tr>
                                        <th className="Table-txt">Offers:</th>
                                        <td className="Table-txt">No offers available</td>
                                    </tr>
                                    <tr>
                                        <th className="Table-txt">Total:</th>
                                        <td className="Table-txt" style={{ fontWeight: "600" }}>{ConvertToINR(TotalPrice)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='Cart-bottom-btn'>
                            <Link to='/' >
                                <button className="Cart-order-btn continueShopping-btn">Continue Shopping</button>
                            </Link>
                            {Auth?.user?.UserID ?
                                <Link to={`/user/${Auth?.user?.UserID}/checkout`} >
                                    <button className="Cart-order-btn checkout-btn">Check Out</button>
                                </Link> :
                                <Link to={`/login`} >
                                    <button className="Cart-order-btn checkout-btn">Log In</button>
                                </Link>
                            }
                        </div>
                    </>}
            </div>

        </Layout >
    )
}
