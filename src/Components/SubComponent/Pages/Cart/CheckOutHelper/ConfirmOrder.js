import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../../../../../Context/Product'
export default function ConfirmOrder({ OpenNext, nextItem }) {
    const { CartProducts, ConvertToINR } = useContext(ProductContext);

    let [TotalPrice, setPrice] = useState(0);
    let price = 0;

    useEffect(() => {
        setPrice(price);
    }, [CartProducts])

    return (
        <>
            <div className="UserTable appfont">
                <table className="table table-hover">
                    <thead className="table-head">
                        <tr>
                            <th className='table-Heading' scope="col">Product Name</th>
                            <th className='table-Heading' scope="col">Model</th>
                            <th className='table-Heading' scope="col">Quantity</th>
                            <th className='table-Heading' scope="col">Unit Price</th>
                            <th className='table-Heading' scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CartProducts?.map((item) => {
                            price += item?.price * item?.quantity;
                            return (
                                <tr key={item?._id}>
                                    <td className='table-Fields'>{item?.name}</td>
                                    <td className='table-Fields'>{item?.model}</td>
                                    <td className='table-Fields'>{item?.quantity}</td>
                                    <td className='table-Fields'>{ConvertToINR(item?.price)}</td>
                                    <td className='table-Fields'>{ConvertToINR(item?.price * item?.quantity)}</td>
                                </tr>
                            )
                        })}

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='table-Fields'>Sub-Total:</td>
                            <td className='table-Fields'>{ConvertToINR(TotalPrice)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td> </td>
                            <td></td>
                            <td className='table-Fields'>Flat Shipping Rate:	</td>
                            <td className='table-Fields'>₹100.00</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='table-Fields'>Total :</td>
                            <td className='table-Fields'><strong>{ConvertToINR(TotalPrice + 100)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="Button-Field">
                <button onClick={() => { OpenNext("item4", nextItem) }} className="Form-Save-Button">Confirm</button>
            </div>
        </>
    )
}
