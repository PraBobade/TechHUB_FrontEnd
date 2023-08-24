import React, { useContext } from 'react'
import moment from 'moment'
import BrainTreeContext from '../../../../Context/BrainTreeContext';
import ProductContext from '../../../../Context/Product';
import '../../../../Public/Css/Product/Order.css'
const BASE_URL = process.env.REACT_APP_BASE_URL

export default function Sub_Orders() {
    const { UserOrders, CancelOrder } = useContext(BrainTreeContext);
    const { ConvertToINR } = useContext(ProductContext)
    function GetMessage(Status) {
        if (Status === "Not Process") {
            return { StatusColor: "#ffc107", StatusMessage: "Your Order is Confirmed" }
        } else if (Status === "Processing") {
            return { StatusColor: "#007bff", StatusMessage: "Your Order is in Processing..!" }
        } else if (Status === "Shipped") {
            return { StatusColor: "#007bff", StatusMessage: "Your Order Has Been Shipped!" }
        } else if (Status === "Delivered") {
            return { StatusColor: "#26a541", StatusMessage: "Your Order Has Been Delivered" }
        } else if (Status === "Cancelled") {
            return { StatusColor: "red", StatusMessage: "As per your request, your order has been cancelled" }
        } else {
            return { StatusColor: "#007bff", StatusMessage: "Your Order is in Process..!" }
        }
    }

    return (
        <div className="Orders appfont">
            <div className="Filter-Orders" style={{ display: 'none' }}>
                <div className="Order-Info-Label">Filter</div>
            </div>
            <div className="No-Item-Present" style={{ margin: "5px 0px", }}>
                {UserOrders.length === 0 && ' You have not made any previous orders!'}
            </div>
            <div className="OrdersList">
                {UserOrders?.slice(0).reverse().map((order, index) => {
                    return (
                        <div key={`${index}1`} className="SingleUserOrder">
                            <div className="OrderInfo">
                                <li className="Orders-Info">
                                    <span className='Order-Info-Label'>OrderID</span>
                                    <span className='Order-Info-result'>{order?._id}</span>
                                </li>
                                <li className="Orders-Info">
                                    <span className='Order-Info-Label'>Ordered</span>
                                    <span className='Order-Info-result'>{moment(order?.createdAt).format('D MMM YYYY, h:mm A')}</span>
                                </li>
                                <li className="Orders-Info">
                                    <span className='Order-Info-Label'>Total Price</span>
                                    <span className='Order-Info-result'>{ConvertToINR(order?.amount)}</span>
                                </li>
                            </div>
                            <div className="Order-Products">
                                {order?.products?.map((pro) => {
                                    return (
                                        <div key={pro?._id} className="EachProduct">
                                            <div className="Order-Image">
                                                <img className="Order-Img-Size" src={`${BASE_URL}/api/v1/product/product-photo/${pro?.product?._id}`} />
                                            </div>
                                            <div className="Order-Details">
                                                <li className="Orders-Info">
                                                    <span style={{ fontWeight: "bolder" }} className='Order-Info-result'>{pro?.product?.name} </span>
                                                </li>
                                                <li className="Orders-Info">
                                                    <span className='Order-Info-Label'>Price</span>
                                                    <span className='Order-Info-result'>₹ {pro?.product?.price} </span>
                                                </li>
                                                <li className="Orders-Info">
                                                    <span className='Order-Info-Label'>Quantity</span>
                                                    <span className='Order-Info-result'>{pro?.ProductQantity} </span>
                                                </li>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="Order-Status">
                                <span className='Order-Info-result'>
                                    <div className='Status_Dot' style={{ backgroundColor: GetMessage(order?.status).StatusColor }} />
                                    {order?.status}
                                </span>
                                <div className='Order-status-msg'>
                                    {GetMessage(order?.status).StatusMessage}
                                </div>
                            </div>
                            <div className="CancelOrder">
                                {(order?.status !== 'Cancelled' && order?.status !== "Delivered") &&
                                    <button onClick={async () => { await CancelOrder(order?._id) }} className='CancelButton'>Cancel Order</button>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
