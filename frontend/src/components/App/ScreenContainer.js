import React from 'react';
import {Route, Routes} from "react-router-dom";
import CartScreen from "../../screens/Cart and Checkout/CartScreen";
import ProductScreen from "../../screens/Common/ProductScreen";
import SigninScreen from "../../screens/User/SigninScreen";
import RegisterScreen from "../../screens/User/RegisterScreen";
import ShippingAddressScreen from "../../screens/Cart and Checkout/ShippingAddressScreen";
import PaymentMethodScreen from "../../screens/Cart and Checkout/PaymentMethodScreen";
import PlaceOrderScreen from "../../screens/Order/PlaceOrderScreen";
import OrderScreen from "../../screens/Order/OrderScreen";
import OrderHistoryScreen from "../../screens/Order/OrderHistoryScreen";
import SearchScreen from "../../screens/Common/SearchScreen";
import Private from "../Secure Route/Private";
import ProfileScreen from "../../screens/User/ProfileScreen";
import MapScreen from "../../screens/MapScreen";
import Admin from "../Secure Route/Admin";
import SupportScreen from "../../screens/Admin/SupportScreen";
import DashboardScreen from "../../screens/Admin/DashboardScreen";
import UserListScreen from "../../screens/Admin/User/UserListScreen";
import UserEditScreen from "../../screens/Admin/User/UserEditScreen";
import ProductListScreen from "../../screens/Admin/Product/ProductListScreen";
import OrderListScreen from "../../screens/Order/OrderListScreen";
import ProductEditScreen from "../../screens/Admin/Product/ProductEditScreen";
import HomeScreen from "../../screens/Common/HomeScreen";
import UserDashboardScreen from "../../screens/User/UserDashboardScreen";
import ProductCreateScreen from "../../screens/Admin/Product/ProductCreateScreen";

export default function ScreenContainer(props) {
    return (
        <Routes>
            <Route path="/cart"                                                                                                                    element={<CartScreen/>}                                   />
            <Route path="/cart/:id"                                                                                                                element={<CartScreen/>}                                   />
            <Route path="/product/:id"                                                                                                             element={<ProductScreen/>}                          exact />
            <Route path="/signin"                                                                                                                  element={<SigninScreen/>}                                 />
            <Route path="/register"                                                                                                                element={<RegisterScreen/>}                               />
            <Route path="/shipping"                                                                                                                element={<ShippingAddressScreen/>}                        />
            <Route path="/payment"                                                                                                                 element={<PaymentMethodScreen/>}                          />
            <Route path="/placeorder"                                                                                                              element={<PlaceOrderScreen/>}                             />
            <Route path="/order/:id"                                                                                                               element={<Private><OrderScreen/></Private>}               />
            <Route path="/orderhistory"                                                                                                            element={<Private><OrderHistoryScreen/></Private>}        />
            <Route path="/orderhistory/pageNumber/:pageNumber"                                                                                     element={<Private><OrderHistoryScreen/></Private>}        />
            <Route path="/search/name"                                                                                                             element={<SearchScreen/>}                           exact />
            <Route path="/search/name/:name"                                                                                                       element={<SearchScreen/>}                           exact />
            <Route path="/search/category/:category"                                                                                               element={<SearchScreen/>}                           exact />
            <Route path="/search/brand/:brand"                                                                                                     element={<SearchScreen/>}                           exact />
            <Route path="/search/category/:category/brand/:brand/name/:name"                                                                       element={<SearchScreen/>}                           exact />
            <Route path="/search/category/:category/brand/:brand/name/:name/min/:min/max/:max"                                                     element={<SearchScreen/>}                           exact />
            <Route path="/search/category/:category/brand/:brand/name/:name/min/:min/max/:max/rating/:rating"                                      element={<SearchScreen/>}                           exact />
            <Route path="/search/category/:category/brand/:brand/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"  element={<SearchScreen/>}                           exact />
            <Route path='/profile'                                                                                                                 element={<Private><ProfileScreen/></Private>}             />
            <Route path='/map'                                                                                                                     element={<Private><MapScreen/></Private>}                 />
            <Route path='/userdashboard'                                                                                                           element={<Private><UserDashboardScreen/></Private>} exact />
            <Route path='/userdashboard/:id'                                                                                                       element={<Admin><UserDashboardScreen/></Admin>}     exact />
            <Route path='/support'                                                                                                                 element={<Admin><SupportScreen/></Admin>}                 />
            <Route path='/dashboard'                                                                                                               element={<Admin><DashboardScreen/></Admin>}               />
            <Route path='/userlist'                                                                                                                element={<Admin><UserListScreen/></Admin>}                />
            <Route path='/userlist/pageNumber/:pageNumber'                                                                                         element={<Admin><UserListScreen/></Admin>}                />
            <Route path='/user/:id/edit'                                                                                                           element={<Admin><UserEditScreen/></Admin>}          exact />
            <Route path='/productlist/pageNumber/:pageNumber'                                                                                      element={<Admin><ProductListScreen/></Admin>}             />
            <Route path='/orderlist/pageNumber/:pageNumber'                                                                                        element={<Admin><OrderListScreen/></Admin>}               />
            <Route path='/product/:id/edit'                                                                                                        element={<Admin><ProductEditScreen/></Admin>}       exact />
            <Route path='/product/create'                                                                                                          element={<Admin><ProductCreateScreen/></Admin>}           />
            <Route path="/"                                                                                                                        element={<HomeScreen/>}                             exact />
            <Route path="/pageNumber/:pageNumber"                                                                                                  element={<HomeScreen/>}                             exact />
        </Routes>
    );
}