import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import '../../../../../Public/Css/Menu-Content/MyAccount.css'
import AuthContext from '../../../../../Context/AuthContext';


export default function MyAccount() {
    const { Auth } = useContext(AuthContext);

    const UserHeading = ['Your Account', 'Password', 'Wish List', 'Your Orders', 'Return Order', 'Transaction', 'Rewards', 'Downloads', 'Have Question..?'];
    const UserSubHeading = ['Edit Account Information', 'Change Your Password', 'Your Liked Products', 'Manage Orders', 'Check Your Return Orders', 'View Transactions', 'Collect Your Reward', 'Check Your Downloads', '24*7 Customer Care Service'];
    const Usericons = ['fa-newspaper', 'fa-lock', 'fa-thumbs-up', 'fa-cart-shopping', 'fa-rotate-left', 'fa-money-bill-transfer', 'fa-circle-dollar-to-slot', 'fa-download', 'fa-circle-question'];
    const UserToLink = ['/edit-account', '/change-password', '/wish-list', '/order', '/order-return', '/transaction', '/rewards', '/downloads'];


    const AdminHeading = ['Your Account', 'Password', 'Admin', 'Category', 'Manage Orders', 'New Product', 'Products', 'Users', 'Question'];
    const AdminSubHeading = ['Edit Account Information', 'Change Your Password', 'Manage All Product Category', 'Add New Admin', 'Check New Orders', 'Add New Products', 'Update/Delete Product', 'Check Users List', 'Give Answer To Customers Quetion'];
    const Adminicons = ['fa-newspaper', 'fa-lock', 'fa-user-plus', 'fa-bolt', 'fa-cart-shopping', 'fa-money-bill-transfer', 'fa-brands fa-paypal', 'fa-circle-dollar-to-slot', 'fa-circle-question'];
    const AdminToLink = ['/edit-account', '/change-password', '/new-admin', '/category', '/manage-orders', '/product-list', '/new-product', '/users'];

    return (<>
        <div className='MyAccount'>
            <div className="Acc-Items-List">
                {Auth?.user?.role === "Admin" ? <>
                    {AdminHeading.map((item, index) => {
                        return (
                            <Link to={`/admin/${Auth?.user?.UserID}${AdminToLink[index]}`} key={index} className="Acc-EachItem">
                                <div className="Acc-Icon">
                                    <i className={`fa-solid ${Adminicons[index]} icon-color`}></i>
                                </div>
                                <div className="Acc-Heading-SubHeading">
                                    <h3 className='Acc-Heading'>{item}</h3>
                                    <small className='Acc-SubHeading'>{AdminSubHeading[index]}</small>
                                </div>
                            </Link>
                        )
                    })}
                </> : <>
                    {UserHeading.map((item, index) => {
                        return (
                            <Link to={`/user/${Auth?.user?.UserID}${UserToLink[index]}`} key={index} className="Acc-EachItem">
                                <div className="Acc-Icon">
                                    <i className={`fa-solid ${Usericons[index]} icon-color`}></i>
                                </div>
                                <div className="Acc-Heading-SubHeading">
                                    <h3 className='Acc-Heading'>{item}</h3>
                                    <small className='Acc-SubHeading'>{UserSubHeading[index]}</small>
                                </div>
                            </Link>
                        )
                    })}
                </>};
            </div>
        </div>   </>

    )
}
