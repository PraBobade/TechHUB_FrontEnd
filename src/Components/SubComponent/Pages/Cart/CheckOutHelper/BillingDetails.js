import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../../../../Context/AuthContext'

export default function BillingDetails({ OpenNext, nextItem }) {
    const { Auth } = useContext(AuthContext);
    const [Info, SetInfo] = useState({ name: '', phone: '', email: '', address: { complete_address: "", country: '', city: '', state: '', pin: '' } })


    function SetDetails() {
        if (Auth.user) {
            SetInfo({
                ...Info,
                name: Auth.user.name,
                phone: Auth.user.phone,
                email: Auth.user.email,
                address: {
                    ...address,
                    complete_address: Auth?.user.address.complete_address,
                    country: Auth.user.address.country,
                    city: Auth.user.address.city,
                    state: Auth.user.address.state,
                    pin: Auth.user.address.pin
                }
            })
        }
    }
    const { name, phone, email, address } = Info;

    useEffect(() => {
        SetDetails();
    }, [Auth])
    return (
        <div className='appfont'>
            <form className='Form'>
                <div className="Form-Field">
                    <label className='Field-Label' htmlFor="name">Name : </label>
                    <input className="Field-Input" type="text" id="name" value={name} disabled />
                </div>
                <div className="Form-Field">
                    <label className='Field-Label' htmlFor="phone">Phone : </label>
                    <input className="Field-Input" type="text" id="phone" value={phone} disabled />
                </div>
                <div className="Form-Field">
                    <label className='Field-Label' htmlFor="email">Email : </label>
                    <input className="Field-Input" type="text" id="email" value={email} disabled />
                </div>
                <div className="Form-Field">
                    <label className='Field-Label' htmlFor="address">Address : </label>
                    <input className="Field-Input" type="text" id="address" value={address?.complete_address} disabled />
                </div>
                <div className="Form-Grid">
                    <div className="Form-Field Grid-Field">
                        <label className='Field-Label' htmlFor="country">Country</label>
                        <input className="Field-Input" type="text" id="country" value={address?.country} disabled />
                    </div>
                    <div className="Form-Field Grid-Field">
                        <label className='Field-Label' htmlFor="state">State</label>
                        <input className="Field-Input" type="text" id="state" value={address?.state} disabled />
                    </div>
                    <div className="Form-Field Grid-Field">
                        <label className='Field-Label' htmlFor="city">City</label>
                        <input className="Field-Input" type="text" id="city" value={address?.city} disabled />
                    </div>
                    <div className="Form-Field Grid-Field">
                        <label className='Field-Label' htmlFor="zip">Pin Code : </label>
                        <input type="text" className="Field-Input" id="zip" value={address?.pin} disabled />
                    </div>
                </div>
            </form>
            <div className="Button-Field">
                <button onClick={() => { OpenNext("item2", nextItem) }} className="Form-Save-Button">Continue..</button>
            </div>
        </div>
    )
}
