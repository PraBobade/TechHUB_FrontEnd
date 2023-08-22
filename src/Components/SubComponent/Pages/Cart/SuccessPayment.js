import React, { useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../../../Context/Product';
import SuccesssImg from '../../../../Public/Images/SuccessPayment.png'
import '../../../../Public/Css/Product/SuccessModal.css'
import AuthContext from '../../../../Context/AuthContext';


export default function SuccessPayment() {
    const { SetCartItems } = useContext(ProductContext);
    const { Auth } = useContext(AuthContext)
    const navigate = useNavigate();
    const showModal = useRef(null);

    async function Navigate() {
        navigate(`/user/${Auth?.user?.UserID}/order`);
    }
    useEffect(() => {
        SetCartItems();
        showModal.current.click();
    }, [])
    return (
        <>
            <button ref={showModal} type="button" data-toggle="modal" data-target="#exampleModalCenter" style={{ display: 'none' }}>
            </button>
            <div onClick={Navigate} className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <div onClick={Navigate} className="Success">
                                <div className="Success-Img">
                                    <img src={SuccesssImg} className='Success-Img-Size' alt="" />
                                </div>
                                <div className="Success-Heading">
                                    Your Order Recived Successfully...!
                                </div>
                                <div className="Success-subHeading">
                                    Thanks for shopping with us online!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
