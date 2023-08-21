import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../../../Context/AuthContext';
import '../../../../Public/Css/Menu-Content/Form.css'
export default function EditAcc() {
    const { Auth, UpdateUserAccount } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [UpdatedUser, SetUpdatedUser] = useState({
        UpdatedName: '', UpdatedEmail: '', UpdatedPhone: '',
        UpdatedAddress: {
            complete_address: '', city: '', state: '', pin: '', country: 'India'
        }
    });

    const { UpdatedName, UpdatedEmail, UpdatedPhone, UpdatedAddress } = UpdatedUser;

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

    const condition = (UpdatedAddress.complete_address !== "N/A" && UpdatedAddress.pin !== "000000" && UpdatedAddress.city !== "N/A" && UpdatedAddress.state !== "N/A");

    async function handleSubmit(event) {
        try {
            setLoading(true);
            event.preventDefault();
            await UpdateUserAccount(UpdatedUser);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        SetDetails();
    }, [Auth])

    return (
        <>
            <form className='Form appfont' onSubmit={handleSubmit}>
                <div className="Form-Heading">
                    My Profile
                </div>
                <hr className='FormHR' />
                <div className="Form-Field">
                    <label className='Field-Label' htmlFor="field1">Name  </label>
                    <input className='Field-Input' type="text" id="field1" value={UpdatedName}
                        onChange={(event) => {
                            SetUpdatedUser({ ...UpdatedUser, UpdatedName: event.target.value })
                        }} />
                </div>

                <div className="Form-Field">
                    <label className='Field-Label' htmlFor="Edit-Email-Field">Email  </label>
                    <input className='Field-Input' value={UpdatedEmail} type="text" id="Edit-Email-Field" disabled />
                </div>

                <div className="Form-Field">
                    <label className='Field-Label' htmlFor="field3">Phone  </label>
                    <input className='Field-Input' value={UpdatedPhone} placeholder='Add 10 Digit Number' type="text" id="field3"
                        onChange={(event) => {
                            SetUpdatedUser({ ...UpdatedUser, UpdatedPhone: event.target.value })
                        }} />
                </div>

                <div className="Form-Field">
                    <label className='Field-Label' htmlFor="complete-address">Address  </label>
                    <input type="text" className='Field-Input' value={UpdatedAddress.complete_address}
                        onChange={(event) => {
                            SetUpdatedUser((prevUser) => ({
                                ...prevUser,
                                UpdatedAddress: {
                                    ...prevUser.UpdatedAddress,
                                    complete_address: event.target.value
                                }
                            }));
                        }} />
                </div>
                <div className="Form-Grid">
                    <div className="Form-Field Grid-Field">
                        <label className='Field-Label' htmlFor="country">Country</label>
                        <input className='Field-Input' type="text" id="country" value={UpdatedAddress.country} disabled />
                    </div>
                    <div className="Form-Field Grid-Field">
                        <label className='Field-Label' htmlFor="state">State</label>
                        <select className='Field-Input' value={UpdatedAddress.state} id="state"
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
                            value={UpdatedAddress.city} type="text" className='Field-Input' id="city" required />
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
                            value={UpdatedAddress.pin} type="text" className='Field-Input' id="zip" required />
                    </div>
                </div>
                <div className="Button-Field">
                    <button type="submit" className="Form-Save-Button" disabled={((!condition) && loading)}>
                        {loading ?
                            <i className="fa-solid fa-spinner fa-spin-pulse" />
                            : <>Update</>
                        }
                    </button>
                </div>
                <hr className='FormHR' />
            </form>
        </>
    )
}
