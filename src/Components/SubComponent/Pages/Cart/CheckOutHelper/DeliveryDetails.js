import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../../../../Context/AuthContext';

export default function DeliveryDetails({ OpenNext, nextItem }) {
    const { Auth, UpdateUserAccount } = useContext(AuthContext);
    const [AddressType, setAddressType] = useState('');
    const [loading, setloading] = useState(false);
    const [UpdatedUser, SetUpdatedUser] = useState({
        UpdatedName: '', UpdatedEmail: '', UpdatedPhone: '',
        UpdatedAddress: {
            complete_address: '', city: '', state: '', pin: '', country: 'India'
        }
    });

    const { UpdatedPhone, UpdatedAddress } = UpdatedUser;
    async function SetDetails() {
        if (Auth.user) {
            SetUpdatedUser({
                ...UpdatedUser,
                UpdatedName: Auth?.user?.name,
                UpdatedEmail: Auth?.user?.email,
                UpdatedPhone: Auth?.user?.phone,
                UpdatedAddress: {
                    ...UpdatedUser.UpdatedAddress,
                    complete_address: Auth?.user?.address?.complete_address,
                    city: Auth?.user?.address?.city,
                    state: Auth?.user?.address?.state,
                    pin: Auth?.user?.address?.pin
                }
            })
        }
    }

    const statesInIndia = ["N/A", 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry'];

    async function handleSubmit(event) {
        setloading(true);
        event.preventDefault();
        const Result = await UpdateUserAccount(UpdatedUser);
        setloading(false);
        if (Result) {
            OpenNext("item3", nextItem);
        }
    }

    useEffect(() => {
        SetDetails();
    }, [Auth]);

    return (
        <>
            <div className="Delivery appfont">
                <div className="Delivery-Option">
                    <input className="Delivery-Option-Input" type="radio" id="sameAdd" name="add"
                        onChange={(event) => { setAddressType(event.target.id); }} />
                    <label className='Delivery-Option-Label' htmlFor="sameAdd">I want to use an existing address</label>
                    {AddressType === "sameAdd" &&
                        <div className="Form Delivery-SameAdd-Details">
                            <div className='Delivery-Address'>{Auth?.user?.address?.complete_address}</div>
                            <div className='Delivery-SubAddress'>{Auth?.user?.address?.city + " " + Auth?.user?.address?.state + " " + Auth?.user?.address?.country + "-" + Auth?.user?.address?.pin}</div>
                            <div className='Delivery-Address'>{Auth?.user?.phone}</div>
                        </div>
                    }
                </div>
                <div className="Delivery-Option">
                    <input className="Delivery-Option-Input" type="radio" id="diffAdd" name="add"
                        onChange={(event) => {
                            setAddressType(event.target.id);
                        }} />
                    <label className='Delivery-Option-Label' htmlFor="diffAdd">I want to use a new address</label>
                </div>
            </div>
            {AddressType === 'diffAdd' && <>
                <form className='Form appfont' onSubmit={handleSubmit}>
                    <div className="Form-Field">
                        <label className='Field-Label' htmlFor="field3">Phone : </label>
                        <input className="Field-Input" value={UpdatedPhone}
                            onChange={(event) => {
                                SetUpdatedUser({ ...UpdatedUser, UpdatedPhone: event.target.value })
                            }}
                            type="text" id="field3" required />
                    </div>

                    <div className="Form-Field">
                        <label className='Field-Label' htmlFor="field4">Address : </label>
                        <input className="Field-Input" value={UpdatedAddress.complete_address}
                            onChange={(event) => {
                                SetUpdatedUser((prevUser) => ({
                                    ...prevUser,
                                    UpdatedAddress: {
                                        ...prevUser.UpdatedAddress,
                                        complete_address: event.target.value
                                    }
                                }));
                            }} type="text" id="field4" required />
                    </div>

                    <div className="Form-Grid">
                        <div className="Form-Field Grid-Field">
                            <label className='Field-Label' htmlFor="country">Country</label>
                            <input className="Field-Input" type="text" id="country" value={UpdatedAddress.country} disabled />
                        </div>
                        <div className="Form-Field Grid-Field">
                            <label className='Field-Label' htmlFor="state">State</label>
                            <select value={UpdatedAddress.state} className="Field-Input" id="state"
                                onChange={(event) => {
                                    SetUpdatedUser((prevUser) => ({
                                        ...prevUser,
                                        UpdatedAddress: {
                                            ...prevUser.UpdatedAddress,
                                            state: event.target.value
                                        }
                                    }));
                                }}
                                required>
                                {statesInIndia.map((state, index) => {
                                    return <option key={index} value={state}>{state}</option>
                                })}
                            </select>
                        </div>
                        <div className="Form-Field Grid-Field">
                            <label className='Field-Label' htmlFor="city">City</label>
                            <input onChange={(event) => {
                                SetUpdatedUser((prevUser) => ({
                                    ...prevUser,
                                    UpdatedAddress: {
                                        ...prevUser.UpdatedAddress,
                                        city: event.target.value
                                    }
                                }));
                            }}
                                value={UpdatedAddress.city} type="text" className="Field-Input" id="city" required />
                        </div>
                        <div className="Form-Field Grid-Field">
                            <label className='Field-Label' htmlFor="zip">Pin Code</label>
                            <input onChange={(event) => {
                                SetUpdatedUser((prevUser) => ({
                                    ...prevUser,
                                    UpdatedAddress: {
                                        ...prevUser.UpdatedAddress,
                                        pin: event.target.value
                                    }
                                }));
                            }}
                                value={UpdatedAddress.pin} type="text" className="Field-Input" id="zip" required />
                        </div>
                    </div>
                    <div className="Button-Field">
                        {(AddressType === 'diffAdd' && UpdatedAddress.complete_address !== "N/A" && UpdatedAddress.pin !== "000000" && UpdatedAddress.pin.length === 6 && UpdatedAddress.city !== "N/A" && UpdatedAddress.state !== "N/A") &&
                            <button type="submit" className="Form-Save-Button" disabled={loading}>
                                {loading ?
                                    <i className="fa-solid fa-spinner fa-spin-pulse" />
                                    : <>Submit</>
                                }
                            </button>
                        }
                    </div>
                </form>
            </>
            }
            <div className="Button-Field">
                {(AddressType === 'sameAdd' && UpdatedAddress.complete_address !== "N/A" && UpdatedAddress.pin !== "000000" && UpdatedAddress.pin.length === 6 && UpdatedAddress.city !== "N/A" && UpdatedAddress.state !== "N/A") &&
                    <button onClick={() => { OpenNext("item3", nextItem) }} className="Form-Save-Button">Continue..</button>
                }
            </div>

        </>
    )
}
