import React, { useContext, useState } from 'react'
import BrainTreeContext from '../../../../../Context/BrainTreeContext';
import DropIn from 'braintree-web-drop-in-react';
import SuccessPayment from '../SuccessPayment';

export default function PaymentMethod() {
    const { ClientToken, PaymentByCard, COD_Payment } = useContext(BrainTreeContext);
    const [Loading, setLoading] = useState(false);
    const [instance, setInstance] = useState(``);
    const [PaymentMode, setPaymentMode] = useState('')
    const [showModal, setShowModal] = useState(false);

    async function handleSubmit() {
        if (PaymentMode === 'Card') {
            const { nonce } = await instance.requestPaymentMethod();
            const Result = await PaymentByCard(nonce)
            if (Result) {
                localStorage.removeItem('cart');
                setShowModal(true);
            }
        } else {
            const Result = await COD_Payment();
            if (Result) {
                localStorage.removeItem('cart');
                setShowModal(true);
            }
        }
    }
    return (
        <>
            <div className="Delivery appfont">
                <div className="Delivery-Option">
                    <input className="Delivery-Option-Input" type="radio" id="COD" name="pay"
                        onChange={(event) => {
                            setLoading(false);
                            setPaymentMode(event.target.id)
                        }} />
                    <label className='Delivery-Option-Label' htmlFor="COD">Cash On Delivery</label><br />
                </div>
                <div className="Delivery-Option">
                    <input className="Delivery-Option-Input" type="radio" id="Card" name="pay"
                        onChange={(event) => {
                            setLoading(true);
                            setPaymentMode(event.target.id)
                        }} />
                    <label className='Delivery-Option-Label' htmlFor="Card">Card Or Paypal</label><br />
                </div>
            </div>

            <div >
                {(ClientToken && PaymentMode === 'Card') &&
                    <DropIn options={{
                        authorization: ClientToken,
                        paypal: { flow: 'vault' }
                    }}
                        onInstance={instance => {
                            setLoading(false)
                            setInstance(instance);
                        }
                        } />
                }

                {Loading &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
                <div style={{ marginLeft: "auto" }}>
                    <label className='Delivery-Option-Label' htmlFor="same-address">
                        I have read and agree to the Terms & Conditions
                    </label>
                    <input type="checkbox" className="Delivery-Option-Input" id="same-address" />
                </div>

                <div className="Button-Field">
                    {(PaymentMode !== '') &&
                        <button onClick={handleSubmit} className='Form-Save-Button'>Place Order</button>
                    }
                </div>
            </div>
            {showModal && <SuccessPayment Result={showModal} />}
        </>
    )
}
