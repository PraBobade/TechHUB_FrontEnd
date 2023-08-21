import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import '../../../Public/Css/Menu/UserMenu.css'
import AuthContext from '../../../Context/AuthContext'

export default function AdminMenu() {
    const { Auth } = useContext(AuthContext);

    const MenuItem = ['My Account', 'Edit Account', 'New Admin', 'Users', 'Category', 'New Product', 'Products', 'Orders']
    const toLink = ['dashboard', 'edit-account', 'new-admin', 'users', 'category', 'new-product', 'product-list', 'manage-orders']
    const iconClasses = ['fa-solid fa-user-tie', 'fa-solid fa-user-pen', 'fa-solid fa-user-plus', 'fa-solid fa-people-group', 'fa-solid fa-bolt', 'fa-solid fa-square-plus', 'fa-brands fa-paypal', 'fa-solid fa-cart-shopping'];
    return (
        <>
            <ol className="User-Menu Menu appfont">
                {MenuItem.map((item, index) => (
                    <li className="User-Menu-Item" key={index}>
                        <NavLink to={`/admin/${Auth.user.UserID}/${toLink[index]}`} className="List-Link">
                            <div className="List-Icon">
                                <i className={`${iconClasses[index]}`}></i>
                            </div>
                            <div className="List-Text">
                                {item}
                            </div>
                        </NavLink>
                    </li>
                ))}
            </ol>
        </>
    )
}
