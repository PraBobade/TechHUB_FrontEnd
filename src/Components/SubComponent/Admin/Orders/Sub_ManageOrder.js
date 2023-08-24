import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import '../../../../Public/Css/Product/Order.css'
import BrainTreeContext from '../../../../Context/BrainTreeContext'
import ProductContext from '../../../../Context/Product';
const BASE_URL = process.env.REACT_APP_BASE_URL



export default function Sub_ManageOrder() {
    const { AllCategories, ConvertToINR } = useContext(ProductContext);

    const Status = ['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const { AdminAllOrders, SetOrderStatus, FilterAdminOrder, DeleteOrder } = useContext(BrainTreeContext);

    const [FilterFields, setFilterFields] = useState({ status: '', category: '' });
    async function FilterOrder() {
        await FilterAdminOrder(FilterFields);
    }
    useEffect(() => { FilterOrder() }, [FilterFields])
    return (
        <div className='Orders appfont'>
            <div className="Filter-Orders">
                <div className='Order-Info-Label'>Filter</div>
                <select className='Filter-Select' value={FilterFields?.status}
                    onChange={async (event) => {
                        const selectedValue = event.target.value;
                        if (selectedValue === "Reset") setFilterFields({ ...FilterFields, status: "" });
                        else setFilterFields({ ...FilterFields, status: selectedValue });
                    }} name="status" id="status" >
                    <option value="Reset">Status</option>
                    {Status?.map((st, index) => {
                        return <option className='Order-Info-result' key={index + "df"} value={st}>{st}</option>
                    })}
                </select>
                <select className="Filter-Select" value={FilterFields.category}
                    onChange={(event) => {
                        const selectedValue = event.target.value;
                        if (selectedValue === "Reset") setFilterFields({ ...FilterFields, category: "" });
                        else setFilterFields({ ...FilterFields, category: selectedValue });
                    }}>
                    <option value="Reset">Category</option>
                    {AllCategories?.map((item) => {
                        return <option className='Order-Info-result' key={item?._id} value={item?.name}>{item?.name}</option>
                    })}
                </select>
            </div>
            <div className="No-Item-Present" style={{ margin: "5px 0px", }}>
                {AdminAllOrders.length === 0 ? 'No Pending Orders Found' : `${AdminAllOrders.length} Result Found`}
            </div>
            <div className="OrdersList">
                {AdminAllOrders?.slice(0).reverse().map((order, index) => {
                    return (
                        <div key={index} className="SingleAdminOrder">
                            <div className="OrderInfo">
                                <li className="Orders-Info">
                                    <span className='Order-Info-Label'>Buyer</span>
                                    <span className='Order-Info-result'>{order?.buyer?.name} </span>
                                </li>
                                <li className="Orders-Info">
                                    <span className='Order-Info-Label'>OrderID</span>
                                    <span className='Order-Info-result'>{order?._id}</span>
                                </li>
                                <li className="Orders-Info">
                                    <span className='Order-Info-Label'>Ordered</span>
                                    <span className='Order-Info-result'>{moment(order?.createdAt).fromNow()}</span>
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
                                                    <span className='Order-Info-result'>{ConvertToINR(pro?.product?.price)} </span>
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
                            <div className="Handle-Order">
                                <div className="CancelOrder">
                                    <button onClick={async () => { await DeleteOrder(order?._id) }} className='CancelButton'>Delete Order</button>
                                </div>
                                <div className='Order-Status'>
                                    <span className='Order-Info-Label'>Order Status</span>
                                    <div className='Order-status-msg'>
                                        <select className='OrderSelect' value={order?.status}
                                            onChange={(event) => { SetOrderStatus(order?._id, event.target.value) }} name="status" id="status" >
                                            {Status?.map((st, index) => {
                                                return <option key={index + 'status'} value={st}>{st}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
