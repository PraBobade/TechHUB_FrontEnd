import React from 'react'
import AddImg1 from '../../../../Public/Images/Watch-Advertise.jpg'
import '../../../../Public/Css/HomePage/Advertise.css'

export default function Watch_Advertise() {
    return (
        <div className="Advertisement-Block appfont">
            <div className="Add-Section">

                <div className="Add-Watch-img">
                    <div className="Watch-Head">
                        <h3 className="Add-Watch-headline">MI Watch Pro</h3>
                        <h5 className="Sub-Watch-headline">Learn More</h5>
                    </div>
                    <img className='Add-Img-Size' src={AddImg1} alt="Loading..." />
                </div>
            </div>
        </div>
    )
}
