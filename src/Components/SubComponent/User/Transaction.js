import React, { useContext } from 'react'
import UserMenu from '../Menu/UserMenu'
import ViewContext from '../../../Context/ViewContext'
import Layout from '../../Layout/Layout'
import moment from 'moment'
import ProductContext from '../../../Context/Product'
import BrainTreeContext from '../../../Context/BrainTreeContext'

export default function Transaction() {
    const { View } = useContext(ViewContext);
    const { ConvertToINR } = useContext(ProductContext)

    const { UserOrders } = useContext(BrainTreeContext);

    return (
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
                        My Transaction
                    </div>
                    <hr className='FormHR' />
                    <div style={{ marginBottom: "10px" }} className="No-Item-Present">
                        Your transaction histroy is.
                    </div>
                    <div className="UserTable appfont">
                        <table className="table table-hover">
                            <thead className="table-head">
                                <tr>
                                    <th className='table-Heading' scope="col">Date Added</th>
                                    <th className='table-Heading' scope="col">Description</th>
                                    <th className='table-Heading' scope="col">Amount (INR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {UserOrders?.length === 0 ? <tr >
                                    <td className='table-Fields' scope="row"></td>
                                    <td className='table-Fields'>You do not have any transactions!</td>
                                    <td className='table-Fields'></td>
                                </tr>
                                    : <>
                                        {UserOrders?.map((item, index) => {
                                            return <tr key={index}>
                                                <td className='table-Fields' scope="row">{moment(item?.createdAt).format('MMM-DD-YYYY | hh:mm A')}</td>
                                                <td className='table-Fields'>{item?.products.map((product) => {
                                                    return (
                                                        <li className='list-points' key={product?._id}>
                                                            {product?.product?.name}
                                                        </li>
                                                    )
                                                })}
                                                </td>
                                                <td className='table-Fields'>{ConvertToINR(item?.amount)}</td>
                                            </tr>
                                        })}
                                    </>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>

    )
}