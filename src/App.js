import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./Components/SubComponent/Pages/FooterPages/About.js";
import Policy from "./Components/SubComponent/Pages/FooterPages/Policy.js";
import Contact from "./Components/SubComponent/Pages/FooterPages/Contact.js";
import PageNotFound from "./Components/SubComponent/Auth/PageNotFound.js";

import Register from "./Components/SubComponent/Auth/Register.js";
import Login from "./Components/SubComponent/Auth/Login.js";
import ForgotPassword from "./Components/SubComponent/Auth/ForgotPassword.js";
import ResetPassword from "./Components/SubComponent/Auth/ResetPassword.js";

import UsersDashboard from "./Components/SubComponent/User/UsersDashboard.js";
import UserPrivateRoute from "./Components/SubComponent/Auth/UserPrivateRoutes.js";
import Orders from "./Components/SubComponent/User/Orders.js";
import WishList from "./Components/SubComponent/User/WishList.js";
import CheckOut from "./Components/SubComponent/Pages/Cart/CheckOut.js";
import OrderReturns from "./Components/SubComponent/User/OrderReturn.js";
import Rewards from "./Components/SubComponent/User/Rewards.js";
import Downloads from "./Components/SubComponent/User/Downloads.js";
import Transaction from "./Components/SubComponent/User/Transaction.js";
import EditAccount from "./Components/SubComponent/User/EditAccount.js";
import ChangePassword from "./Components/SubComponent/User/ChangePassword.js";

import AdminDetail from "./Components/SubComponent/Admin/Admin Panel/AdminDashboard.js";
import AdminPrivateRoute from "./Components/SubComponent/Auth/AdminPrivateRoute.js";
import AdminChangePassword from "./Components/SubComponent/Admin/Admin Panel/ChangePassword.js";
import CreateCategory from "./Components/SubComponent/Admin/Category/CreateCategory.js";
import AddProduct from "./Components/SubComponent/Admin/Product/CreateProduct.js";
import UsersList from "./Components/SubComponent/Admin/UserList.js/UsersList.js";
import NewAdmin from "./Components/SubComponent/Admin/Admin Panel/NewAdmin.js";
import ProductList from "./Components/SubComponent/Admin/Product/AdminProductList.js";
import AdminProductDetails from "./Components/SubComponent/Admin/Product/helpers/Sub_ProductDetails.js";
import ViewProduct from "./Components/SubComponent/Pages/HomePage/ViewProduct.js";
import AdminEditAccount from "./Components/SubComponent/Admin/Admin Panel/EditAccount.js";
import ManageOrders from "./Components/SubComponent/Admin/Orders/ManageOrders.js";

import SearchProduct from "./Components/SubComponent/Pages/HomePage/SearchProduct.js";
import CartPage from "./Components/SubComponent/Pages/Cart/CartPage.js";


import Home from "./Components/SubComponent/Pages/HomePage/HomePage.js";
import CategoryWiseProduct from './Components/SubComponent/Pages/HomePage/CategoryProduct/CategoryWiseProduct.js'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<> <HomePage /></>} /> */}
          <Route path="/" element={<> <Home /></>} />
          <Route path="/category/:id" element={<CategoryWiseProduct />} />


          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />


          <Route path="/user/:userid" element={<UserPrivateRoute />} > {/*First PrivateRoute function will run */}
            <Route path="dashboard" element={<> <UsersDashboard /></>} />
            <Route path="order" element={<> <Orders /></>} />
            <Route path="wish-list" element={<> <WishList /></>} />
            <Route path="checkout" element={<> <CheckOut /></>} />
            <Route path="downloads" element={<> <Downloads /></>} />
            <Route path="order-return" element={<> <OrderReturns /></>} />
            <Route path="rewards" element={<> <Rewards /></>} />
            <Route path="transaction" element={<> <Transaction /></>} />
            <Route path="edit-account" element={<> <EditAccount /></>} />
            <Route path="change-password" element={<> <ChangePassword /></>} />
          </Route>

          <Route path="/search/:keyword" element={<SearchProduct />} />
          <Route path="/product/:slug" element={<ViewProduct />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/admin/:adminid" element={<AdminPrivateRoute />} > {/*First PrivateRoute function will run */}
            <Route path="dashboard" element={<> <AdminDetail /></>} />
            <Route path="edit-account" element={<> <AdminEditAccount /></>} />
            <Route path="change-password" element={<> <AdminChangePassword /></>} />
            <Route path="new-admin" element={<> <NewAdmin /></>} />
            <Route path="category" element={<> <CreateCategory /></>} />
            <Route path="new-product" element={<> <AddProduct /></>} />
            <Route path="users" element={<> <UsersList /></>} />
            <Route path="product-list" element={<> <ProductList /></>} />
            <Route path="product-list/:slug" element={<> <AdminProductDetails /></>} />
            <Route path="manage-orders" element={<> <ManageOrders /></>} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
