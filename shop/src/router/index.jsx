import React from "react"
import {HashRouter as Router,Routes,Route} from "react-router-dom"
import Home from "../pages/Main/Home"
import User from "../pages/Main/User"
import OrderList from "../pages/Main/OrderList"
import City from "../pages/City"
import Details from "../pages/Details"
import Layout from "../pages/Main/Layout"
import Search from "../pages/Search"
import Login from "../pages/Login"
import Category from "../pages/Category"
import NewList from "../pages/NewList"
import UserInfo from "../pages/UserInfo"
import Address from "../pages/Address"
import AddressForm from "../pages/Address/AddressForm"
import Cart from "../pages/Main/Cart"
import Collect from "../pages/Collect"
import Order from "../pages/Order"
import Pay from "../pages/Pay"
import Comment from "../pages/Comment"
import Refund from "../pages/Refund"
import Sign from "../pages/Sign"

const AppRouter=()=>{
    return(
            <Router>
                <Routes>
                    {/* 底部导航栏 */}
                    <Route path="/" element={<Layout/>}>
                        <Route exact path="/" element={<Home/>}></Route>
                        <Route path="/cart" element={<Cart/>}></Route>
                        <Route path="/orderList" element={<OrderList/>}></Route>
                        <Route path="/user" element={<User/>}></Route>
                    </Route>
                    <Route path="/city" element={<City/>}></Route>
                    <Route path="/details/:id" element={<Details/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/sign" element={<Sign/>} ></Route>
                    <Route path="/search/:keywords" element={<Search/>}></Route>
                    <Route path="/category" element={<Category/>}></Route>
                    <Route path="/newlist" element={<NewList/>}></Route>
                    <Route path="/order" element={<Order/>}></Route>
                    <Route path="/pay" element={<Pay/>}></Route>
                    <Route path="/comment" element={<Comment/>}></Route>
                    <Route path="/refund" element={<Refund/>}></Route>
                    {/* 用户 */}
                    <Route path="/userinfo/:id" element={<UserInfo/>}></Route>
                    <Route path="/address/:id" element={<Address/>}></Route>
                    <Route path="/address/add" element={<AddressForm/>}></Route>
                    <Route path="/address/edit/:id" element={<AddressForm/>}></Route>
                    <Route path="/collect/:id" element={<Collect/>}></Route>
                </Routes>                                                 
            </Router>                
    )
}

export default AppRouter