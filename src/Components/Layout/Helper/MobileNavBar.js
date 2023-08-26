import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../../../Public/Css/Layout/NavigationBar.css'
import AuthContext from '../../../Context/AuthContext'
import ProductContext from '../../../Context/Product'
import { Badge } from 'antd'
import LOGO from '../../../Public/Images/LOgo.png'



export default function MobileNavBar() {
    const ClearModal = useRef(null);
    const navigate = useNavigate();
    const { Auth, LogOut } = useContext(AuthContext);
    const { SearchProduct, CartProducts } = useContext(ProductContext);

    const heading = ['Login', 'Register']
    const icons = ['fa-lock', 'fa-user-plus']
    const toLink = ['/login', '/register']

    const Authheading = ['My Account', 'Order History', 'Wishlist', 'Logout']
    const Authicons = ['fa-circle-user', 'fa-truck-fast', 'fa-thumbs-up', 'fa-power-off']
    const AuthtoLink = ['dashboard', 'order', 'wish-list']

    const Adminheading = ['My Account', 'Orders', 'Logout']
    const AdminIcons = ['fa-circle-user', 'fa-truck-fast', 'fa-power-off']
    const AdminToLink = ['dashboard', 'manage-orders']

    const [SearchKeyword, setSearchKeyword] = useState('');

    async function handleSearch(event) {
        event.preventDefault();
        ClearModal.current.click();
        const Result = await SearchProduct(SearchKeyword);
        if (Result) {
            navigate(`/search/${SearchKeyword}`);
        }
    }
    async function handleLogout() {
        if (LogOut()) {
            navigate('/')
        }
    }

    return (
        <div className="NavigationBar">
            <div className="Toggle-item" style={{ width: "80px" }}></div>

            <Link to='/' className="Brand VH-Center">
                <img className='Brand-Img' src={LOGO} alt="" />
            </Link>

            <div className='MobileNavItems'>
                <div className='Mobile-Search'>
                    <button className='MobileIcons' data-toggle="modal" data-target=".bd-example-modal-sm">
                        <i className="Mo-Icons fa-solid fa-magnifying-glass" />
                    </button>
                    <div ref={ClearModal} className="modal fade bd-example-modal-sm" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                        <div style={{ display: "inline-block" }} className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="mobile-search">
                                    <input value={SearchKeyword} onChange={(event) => { setSearchKeyword(event.target.value) }} className='mo-search-input' id='search' type="search" aria-label="Search" />
                                    <button onClick={handleSearch} className='mo-search-button' type="submit" disabled={SearchKeyword === ''}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="dropdown">
                    <button className="MobileIcons dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="Mo-Icons fa-regular fa-user" />
                    </button>
                    <div className="dropdown-menu Mobile-dd" aria-labelledby="dropdownMenu2">
                        {Auth?.token ? <>
                            {Auth?.user?.role === "Admin" ? <>
                                {Adminheading?.map((item, index) => {
                                    return (
                                        <div key={index} >
                                            {item !== 'Logout' ?
                                                <>
                                                    <Link to={`/admin/${Auth?.user?.UserID}/${AdminToLink[index]}`} className="dropdown-item" >
                                                        <div className="co-user-icon">
                                                            <i className={`fa-solid ${AdminIcons[index]}`}></i>
                                                        </div>
                                                        <div className="co-icon-txt">{item}</div>
                                                    </Link>
                                                </>
                                                :
                                                <div onClick={handleLogout} className="dropdown-item py-2" >
                                                    <div className="co-user-icon">
                                                        <i className={`fa-solid ${AdminIcons[index]}`}></i>
                                                    </div>
                                                    <div style={{ fontWeight: "bolder" }} className="co-icon-txt">{item}</div>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                            </> : <>
                                {Authheading?.map((item, index) => {
                                    return (
                                        <div key={index} >
                                            {item !== 'Logout' ?
                                                <>
                                                    <Link to={`/user/${Auth?.user?.UserID}/${AuthtoLink[index]}`} className="dropdown-item" >
                                                        <div className="co-user-icon">
                                                            <i className={`fa-solid ${Authicons[index]}`}></i>
                                                        </div>
                                                        <div className="co-icon-txt">{item}</div>
                                                    </Link>
                                                </>
                                                :
                                                <div onClick={handleLogout} className="dropdown-item py-2" >
                                                    <div className="co-user-icon">
                                                        <i className={`fa-solid ${Authicons[index]}`}></i>
                                                    </div>
                                                    <div style={{ fontWeight: "bolder" }} className="co-icon-txt">{item}</div>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                            </>}

                        </> : <>
                            {heading?.map((item, index) => {
                                return (
                                    <Link to={toLink[index]} key={index} className="dropdown-item flex" type="button">
                                        <div className="co-user-icon">
                                            <i className={`fa-solid ${icons[index]}`}></i>
                                        </div>
                                        <div className="co-icon-txt">{item}</div>
                                    </Link>
                                )
                            })}
                        </>}

                    </div>
                </div>
                <div className="MobileIcons" >
                    <Badge count={CartProducts?.length} >
                        <Link to='/cart' className="Mo-Icons fa-solid fa-cart-shopping mo-cart" />
                    </Badge >
                </div>
            </div>
        </div>
    )
}
