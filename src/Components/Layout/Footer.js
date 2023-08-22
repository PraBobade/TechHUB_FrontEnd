import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../../Public/Css/Layout/Footer.css'
import { BsTelephoneOutbound } from 'react-icons/bs'
import AuthContext from '../../Context/AuthContext'

export default function Footer() {
  const { Auth } = useContext(AuthContext);
  return (
    <div className="Footer appfont">
      <div className="Footer-Content">
        <div className="Content-Row">
          <div className='Footer-Heading'>TechHUB</div>
          <ul className="Row-List">
            <li ><Link to={'/'} className='Row-List-Item'>Home</Link></li>
            <li ><Link to='/about' className='Row-List-Item'>About us</Link></li>
            <li ><Link to='/faq' className='Row-List-Item'>FAQs</Link></li>
            <li ><Link to='/policy' className='Row-List-Item'>Policy</Link></li>
          </ul>
        </div>
        <div className="Content-Row">
          <div className='Footer-Heading'>My Account</div>
          <ul className="Row-List">
            <li ><Link to={`/user/${Auth?.user?.UserID}/dashboard`} className='Row-List-Item'>Account</Link></li>
            <li ><Link to={`/user/${Auth?.user?.UserID}/wish-list`} className='Row-List-Item'>WishList</Link></li>
            <li ><Link to={`/user/${Auth?.user?.UserID}/order`} className='Row-List-Item'>Orders</Link></li>
            <li ><Link to={`/user/${Auth?.user?.UserID}/transaction`} className='Row-List-Item'>Transaction</Link></li>
          </ul>
        </div>
        <div className="Content-Row">
          <div className='Footer-Heading'>Contact</div>
          <ul className="Row-List">
            <li className='Row-List-Item'><BsTelephoneOutbound /> : +91-9876543210</li>
            <li ><Link to='/contact' className='Row-List-Item'>Contact Us</Link></li>
          </ul>
        </div>
        <div className="Content-Row">
          <div className='Footer-Heading'>Customer Service</div>
          <ul className="Row-List">
            <li ><Link to='' className='Row-List-Item'>Gift Certificates</Link></li>
            <li ><Link to='' className='Row-List-Item'>Login Vendor</Link></li>
            <li ><Link to='' className='Row-List-Item'>Browse Seller</Link></li>
            <li ><Link to='' className='Row-List-Item'>Delivery Partner</Link></li>
          </ul>
        </div>
        <div className="Content-Row-NewsSeller">
          <div className='Footer-Heading'>Subscribe to our newsletter</div>
          <p className='Footer-SubHeading'>Monthly digest of what's new and exciting from us.</p>
          <div className="NewsSeller-Field">
            <input type="text" className="NewsSeller-Input Field-Input" placeholder="Email address" />
            <button className="NewsSeller-Save-btn Form-Save-Button" type="button">Subscribe</button>
          </div>
        </div>
      </div>
      <hr className='FooterHR' />
      <div className="Footer-Rights">
        <div className="Footer-SubHeading">
          © 2023 Company, Inc. All rights reserved.
        </div>
      </div>
    </div>
  )
}
