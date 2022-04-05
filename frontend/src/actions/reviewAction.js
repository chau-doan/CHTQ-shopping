import * as rc from '../constants/reviewConstant'
import {fetching} from "../helper";
import * as method from "../constants/AJAXConstant"
import * as oc from "../constants/orderConstant";
import {REVIEW_USER_LIST_REQUEST} from "../constants/reviewConstant";

export const listReviewProduct = (productId) => async (dispatch) => {
    const url = `/api/reviews/product/${productId}`;
    await fetching(
        dispatch,
        method.GET,
        url,
        rc.REVIEW_PRODUCT_LIST_REQUEST,
        rc.REVIEW_PRODUCT_LIST_SUCCESS,
        rc.REVIEW_PRODUCT_LIST_FAIL
    );
}

export const listReviewUser = ({pageNumber='', userId}) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/reviews/user/${userId}?pageNumber=${pageNumber}`;
    await fetching(
        dispatch,
        method.GET,
        url,
        rc.REVIEW_USER_LIST_REQUEST,
        rc.REVIEW_USER_LIST_SUCCESS,
        rc.REVIEW_USER_LIST_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const deleteReview = (reviewId) => async (dispatch, getState) => {
    const { userSignin:{userInfo} } = getState();
    const url = `/api/reviews/${reviewId}`;
    await fetching(
        dispatch,
        method.DELETE,
        url,
        rc.REVIEW_DELETE_REQUEST,
        rc.REVIEW_DELETE_SUCCESS,
        rc.REVIEW_DELETE_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    );
}

export const createReview = (productId, review) => async (dispatch, getState) => {
    const { userSignin:{userInfo} } = getState();
    const url = `/api/reviews/${productId}`;
    await fetching(
        dispatch,
        method.POST,
        url,
        rc.REVIEW_CREATE_REQUEST,
        rc.REVIEW_CREATE_SUCCESS,
        rc.REVIEW_CREATE_FAIL,
        {
            sendData: review,
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    );
}

export const updateReview = (reviewId, review) => async (dispatch, getState) => {
    const { userSignin:{userInfo} } = getState();
    const url = `/api/reviews/${reviewId}`;
    await fetching(
        dispatch,
        method.PUT,
        url,
        rc.REVIEW_UPDATE_REQUEST,
        rc.REVIEW_UPDATE_SUCCESS,
        rc.REVIEW_UPDATE_FAIL,
        {
            sendData: review,
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    );
}