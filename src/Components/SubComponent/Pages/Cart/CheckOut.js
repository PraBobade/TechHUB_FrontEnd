import React, { useState, useRef } from 'react'
import Layout from '../../../Layout/Layout';
import ConfirmOrder from './CheckOutHelper/ConfirmOrder';
import DeliveryDetails from './CheckOutHelper/DeliveryDetails';
import PaymentMethod from './CheckOutHelper/PaymentMethod';
import BillingDetails from './CheckOutHelper/BillingDetails';
import '../../../../Public/Css/Cart/CheckOut.css'


export default function CheckOut() {
    const [items, setItem] = useState({ item1: false, item2: true, item3: true, item4: true });
    const { item1, item2, item3, item4 } = items

    const ItemCollapsed2 = useRef(null);
    const ItemCollapsed3 = useRef(null);
    const ItemCollapsed4 = useRef(null);

    function OpenNext(field, collasedItem) {
        setItem({ ...items, [field]: false });
        setTimeout(() => {
            collasedItem.current.click();
        }, 10);
    }


    return (
        <Layout title={'CheckOut - TechHub'}>
            <div className="content-grid appfont">
                <div className='Form-Heading'>Check Out</div>
                <div className='Panel-Group-CheckOut' id="accordion">
                    <div className="Panel-Item">
                        <button className="Panel-Button" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" disabled={item1}>
                            Step 1 : Billing Details
                        </button>
                        <div className="Panel-Content-CheckOut collapse show" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordion">
                            <BillingDetails OpenNext={OpenNext} nextItem={ItemCollapsed2} />
                        </div>
                    </div>
                    <div className="Panel-Item">
                        <button ref={ItemCollapsed2} id="headingTwo" className="Panel-Button collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" disabled={item2}>
                            Step 2 : Delivery Details
                        </button>
                        <div id="collapseTwo" className='Panel-Content-CheckOut collapse' aria-labelledby="headingTwo" data-parent="#accordion">
                            <DeliveryDetails OpenNext={OpenNext} nextItem={ItemCollapsed3} />
                        </div>
                    </div>
                    <div className="Panel-Item">
                        <button ref={ItemCollapsed3} className="Panel-Button collapsed" id="headingFive" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" disabled={item3}>
                            Step 3 : Confirm Order
                        </button>
                        <div id="collapseFive" className="Panel-Content-CheckOut collapse" aria-labelledby="headingFive" data-parent="#accordion">
                            <ConfirmOrder OpenNext={OpenNext} nextItem={ItemCollapsed4} />
                        </div>
                    </div>
                    <div className="Panel-Item">
                        <button ref={ItemCollapsed4} className='Panel-Button collapsed' id="headingFour" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" disabled={item4}>
                            Step 4 : Payment Method
                        </button>
                        <div id="collapseFour" className='Panel-Content-CheckOut collapse' aria-labelledby="headingFour" data-parent="#accordion">
                            <PaymentMethod />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
