import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import '../../../Public/Css/Menu/UserMenu.css'
import AuthContext from '../../../Context/AuthContext'

export default function UserMenu() {

    const { Auth } = useContext(AuthContext);

    const MenuItem = ['My Account', 'Edit Profile', 'Password', 'Orders', 'Return Orders', 'Downloads', 'Rewards', 'Wish List', 'Transaction']
    const toLink = ['dashboard', 'edit-account', 'change-password', 'order', 'order-return', 'downloads', 'rewards', 'wish-list', 'transaction']
    const iconClasses = ['fa-user-tie', 'fa-user-pen', 'fa-lock', 'fa-truck-fast', 'fa-rotate-left', 'fa-download', 'fa-sack-dollar', 'fa-thumbs-up', 'fa-right-left'];

    return (
        <ol className="User-Menu Menu appfont">
            {MenuItem.map((item, index) => (
                <li className="User-Menu-Item" key={index}>
                    <NavLink className='List-Link' to={`/user/${Auth?.user?.UserID}/${toLink[index]}`}>
                        <div className="List-Icon">
                            <i className={`fa-solid ${iconClasses[index]}`}></i>
                        </div>
                        <div className="List-Text">
                            {item}
                        </div>
                    </NavLink>
                </li>
            ))}
        </ol>
    )
}