import { CART_EMPTY } from '../constants/cartConstant';
import * as oc from '../constants/orderConstant';
import { fetching } from '../helper.js';
import * as method from '../constants/AJAXConstant'

export const createOrder = (order) => async(dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = '/api/orders';
    await fetching(
        dispatch,
        method.POST,
        url,
        oc.ORDER_CREATE_REQUEST,
        oc.ORDER_CREATE_SUCCESS,
        oc.ORDER_CREATE_FAIL,
        {
            sendData:       order,
            header:         {Authorization: `Bearer ${userInfo.token}`},
            secondDispatch: true,
            secondConstant: CART_EMPTY
        }
    )
}


export const detailsOrder = (orderId) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/${orderId}`;
    await fetching(
        dispatch,
        method.GET,
        url,
        oc.ORDER_DETAIL_REQUEST,
        oc.ORDER_DETAIL_SUCCESS,
        oc.ORDER_DETAIL_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    );
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/${order._id}/pay`;
    await fetching(
        dispatch,
        method.PUT,
        url,
        oc.ORDER_PAY_REQUEST,
        oc.ORDER_PAY_SUCCESS,
        oc.ORDER_PAY_FAIL,
        {
            sendData:   paymentResult,
            header:     {Authorization: `Bearer ${userInfo.token}`},
        }
    )
}

export const deliverOrder = (orderId) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/${orderId}/deliver`;
    await fetching(
        dispatch,
        method.PUT,
        url,
        oc.ORDER_DELIVER_REQUEST,
        oc.ORDER_DELIVER_SUCCESS,
        oc.ORDER_DELIVER_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const cancelOrder = (orderId) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/${orderId}/cancelrequest`;
    await fetching(
        dispatch,
        method.PUT,
        url,
        oc.ORDER_REQUEST_CANCEL_REQUEST,
        oc.ORDER_REQUEST_CANCEL_SUCCESS,
        oc.ORDER_REQUEST_CANCEL_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const confirmCancelOrder = (orderId) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/${orderId}/canceled`;
    await fetching(
        dispatch,
        method.PUT,
        url,
        oc.ORDER_CANCEL_REQUEST,
        oc.ORDER_CANCEL_SUCCESS,
        oc.ORDER_CANCEL_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const listOrderMine = ({pageNumber=''}) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/mine?pageNumber=${pageNumber}`;
    await fetching(
        dispatch,
        method.GET,
        url,
        oc.ORDER_MINE_LIST_REQUEST,
        oc.ORDER_MINE_LIST_SUCCESS,
        oc.ORDER_MINE_LIST_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const listOrder = ({pageNumber=''}) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders?pageNumber=${pageNumber}`;
    await fetching(
        dispatch,
        method.GET,
        url,
        oc.ORDER_LIST_REQUEST,
        oc.ORDER_LIST_SUCCESS,
        oc.ORDER_LIST_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const listOrderUser = ({pageNumber='', userId}) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/user/${userId}?pageNumber=${pageNumber}`;
    await fetching(
        dispatch,
        method.GET,
        url,
        oc.ORDER_LIST_USER_REQUEST,
        oc.ORDER_LIST_USER_SUCCESS,
        oc.ORDER_LIST_USER_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const deleteOrder = (orderId) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/${orderId}`;
    await fetching(
        dispatch,
        method.DELETE,
        url,
        oc.ORDER_DELETE_REQUEST,
        oc.ORDER_DELETE_SUCCESS,
        oc.ORDER_DELETE_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const summaryOrder = () => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/summary`;
    await fetching(
        dispatch,
        method.GET,
        url,
        oc.ORDER_SUMMARY_REQUEST,
        oc.ORDER_SUMMARY_SUCCESS,
        oc.ORDER_SUMMARY_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}