import React from 'react'
import { Link } from 'react-router-dom'
import AddImg1 from '../../../../Public/Images/Add_Image.webp'
import AddImg2 from '../../../../Public/Images/Add-Img2.webp'

import '../../../../Public/Css/HomePage/Advertise.css'

export default function Home_Advertise() {
    return (
        <div className="Advertisement-Block appfont">
            <div className="Second-Add-Section">
                <div className="Add-img">
                    <img className='Add-Img-Size' src={AddImg1} alt="" />
                </div>
                <h3 className="Add-headline">Apps & Services</h3>
                <Link className='Add-Sub-headline' to='/product/Samsung-Galaxy-S23-Ultra'>
                    <h5 className="Sub-headline">Learn More</h5>
                </Link>
            </div>
            <div className="First-Add-Section">
                <div className="Add-img">
                    <img className='Add-Img-Size' src={AddImg2} alt="" />
                </div>
                <h3 className="Add-headline">Galaxy S22 Ultra</h3>
                <Link className='Add-Sub-headline' to='/product/Samsung-Galaxy-S23-Ultra'>
                    <h5 className="Sub-headline">Learn More</h5>
                </Link>
            </div>
        </div>
    )
}
