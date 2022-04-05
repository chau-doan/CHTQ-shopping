import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import {
    productBrandListReducer,
    productCategoryListReducer,
    productCreateReducer, productDeleteReducer,
    productDetailsReducer,
    productListReducer, productReviewCreateReducer,
    productUpdateReducer
} from "./reducers/productReducer";
import {getStorage} from "./helper";
import * as sc from "./constants/storageConstant";
import {cartReducers} from "./reducers/cartReducer";
import {
    userAddressMapReducer,
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userRegisterReducer,
    userSigninReducer, userUpdateProfileReducer, userUpdateReducer
} from "./reducers/userReducer";
import {orderCreateReducer, orderDetailsReducer} from "./reducers/orderCreateReducer";
import {
    orderConfirmCancelReducer,
    orderDeleteReducer,
    orderDeliverReducer,
    orderListMineReducer,
    orderListReducer, orderListUserReducer,
    orderPayReducer, orderRequestCancelReducer, orderSumaryReducer
} from "./reducers/orderReducer";
import {
    reviewCreateReducer,
    reviewDeleteReducer,
    reviewProductListReducer,
    reviewUpdateReducer, reviewUserListReducer
} from "./reducers/reviewReducer";

const initialState = {
    userSignin: {
        userInfo:           getStorage(sc.USER_INFO)
    },
    cart:{
        cartItems:          getStorage(sc.CART_ITEMS),
        shippingAddress:    getStorage(sc.SHIPPING_ADDRESS),
        paymentMethod:      'PayPal'
    },
};

const reducer = combineReducers({
    productList:            productListReducer,
    productDetails:         productDetailsReducer,
    productCreate:          productCreateReducer,
    productUpdate:          productUpdateReducer,
    productDelete:          productDeleteReducer,
    productCategoryList:    productCategoryListReducer,
    productBrandList:       productBrandListReducer,
    productReviewCreate:    productReviewCreateReducer,
    reviewProductList:      reviewProductListReducer,
    reviewUserList:         reviewUserListReducer,
    reviewCreate:           reviewCreateReducer,
    reviewUpdate:           reviewUpdateReducer,
    reviewDelete:           reviewDeleteReducer,
    cart:                   cartReducers,
    userSignin:             userSigninReducer,
    userRegister:           userRegisterReducer,
    userDetails:            userDetailsReducer,
    userList:               userListReducer,
    userDelete:             userDeleteReducer,
    userUpdate:             userUpdateReducer,
    userUpdateProfile:      userUpdateProfileReducer,
    userAddressMap:         userAddressMapReducer,
    orderCreate:            orderCreateReducer,
    orderDetails:           orderDetailsReducer,
    orderPay:               orderPayReducer,
    orderDeliver:           orderDeliverReducer,
    orderRequestCancel:     orderRequestCancelReducer,
    orderConfirmCancel:     orderConfirmCancelReducer,
    orderListMine:          orderListMineReducer,
    orderListUser:          orderListUserReducer,
    orderList:              orderListReducer,
    orderDelete:            orderDeleteReducer,
    orderSummary:           orderSumaryReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk)));
export default store;