import Axios from "axios"
import {
    CART_ADD_ITEM,
    CART_EDIT_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstant";
import * as sc from '../constants/storageConstant'
import {URL} from "../constants/AJAXConstant";

export const addToCart = (productId, qty, options) => async (dispatch, getState) => {
    const {data} = await Axios.get(URL + `/api/products/${productId}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name:           data.name,
            image:          data.image,
            price:          data.price,
            countInStock:   data.countInStock,
            product:        data._id,
            options,
            qty,
        }
    });
    localStorage.setItem(sc.CART_ITEMS, JSON.stringify(getState().cart.cartItems));
};

export const editCart = (productId, qty, options) => async (dispatch, getState) => {
    const {data} = await Axios.get(URL + `/api/products/${productId}`);

    dispatch({
        type: CART_EDIT_ITEM,
        payload:{
            name:           data.name,
            image:          data.image,
            price:          data.price,
            countInStock:   data.countInStock,
            product:        data._id,
            options,
            qty,
        }
    });
    localStorage.setItem(sc.CART_ITEMS, JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId, options) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: { productId, options }
    });
    localStorage.setItem(sc.CART_ITEMS, JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem(sc.SHIPPING_ADDRESS, JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })
}