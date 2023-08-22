import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthContext from "./AuthContext";
const BrainTreeContext = createContext();
const BASE_URL = process.env.REACT_APP_BASE_URL

export function BrainTreeState({ children }) {
    const [ClientToken, setClientToken] = useState('');
    const { Auth } = useContext(AuthContext);
    /* ${BASE_URL} */
    async function GetBrainTreeToken() {
        const Result = await axios.get(`${BASE_URL}/api/v1/braintree/token`);
        if (Result?.data?.status === 'Pass') {
            setClientToken(Result.data.response.clientToken)
        }
    }

    async function BrainTreePayment(nonce) {
        try {
            const cart = JSON.parse(localStorage.getItem('cart'));
            const Result = await axios.post(`${BASE_URL}/api/v1/braintree/payment`,
                { nonce, cart }, { headers: { Authorization: "Bearer " + Auth?.token } });
            if (Result.data.ok) {
                GetAllUserOrder();
                return true
            } else {
                toast.error('Payment Failed...!');
                return false
            }
        } catch (error) {
            toast.error(`Something Error Occure, Please Try Later..`);
            return false
        }
    }
    async function COD_Payment() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart'));
            const Result = await axios.post(`${BASE_URL}/api/v1/braintree/cod-payment`,
                { cart }, { headers: { Authorization: "Bearer " + Auth?.token } });
            if (Result.data.ok) {
                GetAllUserOrder();
                return true
            } else {
                toast.error('Payment Failed...!');
                return false
            }
        } catch (error) {
            toast.error(`Something Error Occure, Please Try Later..`);
            return false
        }
    }

    // Orders
    const [UserOrders, SetUserOrders] = useState([]);
    async function GetAllUserOrder() {
        try {
            const Result = await axios.get(`${BASE_URL}/api/v1/orders/all-user-orders`,
                { headers: { Authorization: "Bearer " + Auth?.token } });
            if (Result?.data?.status === 'Pass') {
                SetUserOrders(Result?.data?.orders);
                return Result.data
            } else {
                return false
            }
        } catch (error) {
            toast.error(`Something went Wrong, Please Try Later`);
        }
    }
    const [AdminAllOrders, SetAdminAllOrders] = useState([]);
    async function GetAllAdminOrder() {
        try {
            const Result = await axios.get(`${BASE_URL}/api/v1/admin/orders/all-orders`,
                { headers: { Authorization: "Bearer " + Auth?.token } });
            if (Result?.data?.status === 'Pass') {
                SetAdminAllOrders(Result?.data?.orders);
            } else {
                return false
            }
        } catch (error) {
            toast.error(`Something went Wrong, Please Try Later`);
        }
    }
    // filter orders
    async function FilterAdminOrder(Data) {
        try {
            const Result = await axios.post(`${BASE_URL}/api/v1/admin/orders/filter-orders`,
                Data, { headers: { Authorization: "Bearer " + Auth?.token } });
            if (Result?.data?.status === 'Pass') {
                SetAdminAllOrders(Result?.data?.orders);
            }
        } catch (error) {
            toast.error(`Something went Wrong, Please Try Later`);
        }
    }
    async function CancelOrder(OrderId) {
        const Result = await axios.put(`${BASE_URL}/api/v1/orders/cancel-UserOrder/${OrderId}`, { status: "Cancelled" },
            { headers: { Authorization: "Bearer " + Auth?.token } });
        if (Result?.data?.status === 'Pass') {
            toast.success('The Order Cancelled Successfully');
            GetAllAdminOrder();
            GetAllUserOrder();
        } else {
            toast.error('Error in Setting Order Status');
        }
    }
    async function SetOrderStatus(OrderID, status) {
        const Result = await axios.put(`${BASE_URL}/api/v1/admin/orders/set-status/${OrderID}`,
            { status }, { headers: { Authorization: "Bearer " + Auth?.token } });
        if (Result?.data?.status === 'Pass') {
            toast.success('The Status Changed Successfully');
            GetAllAdminOrder();
        } else {
            toast.error('Error in Setting Order Status');
        }
    }
    async function DeleteOrder(OrderID) {
        const Result = await axios.delete(`${BASE_URL}/api/v1/admin/orders/delete-order/${OrderID}`,
            { headers: { Authorization: "Bearer " + Auth?.token } });
        if (Result?.data?.status === 'Pass') {
            toast.success(Result?.data?.message);
            GetAllAdminOrder();
        } else {
            toast.error('Error in Deleting Order');
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (Auth?.token) {
            GetAllUserOrder();
            GetAllAdminOrder();
            GetBrainTreeToken();
        }
    }, [Auth?.token])

    return (
        <BrainTreeContext.Provider value={{
            GetBrainTreeToken, ClientToken, BrainTreePayment, COD_Payment,
            UserOrders, AdminAllOrders, FilterAdminOrder, SetOrderStatus, CancelOrder, DeleteOrder
        }}>
            {children}
        </BrainTreeContext.Provider>
    )
}

export default BrainTreeContext