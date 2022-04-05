import { fetching } from '../helper.js'
import * as pc from "../constants/productConstant";
import * as method from '../constants/AJAXConstant'


export const listProducts = ({
                                 pageNumber='',
                                 name='',
                                 category ='',
                                 brand='',
                                 min=0,
                                 max=0,
                                 rating=0,
                                 order=''
}) => async (dispatch) => {
    const url = `/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}&brand=${brand}&min=${min}&max=${max}&rating=${rating}&order=${order}`;
    await fetching(
                dispatch,
                method.GET,
                url,
                pc.PRODUCT_LIST_REQUEST,
                pc.PRODUCT_LIST_SUCCESS,
                pc.PRODUCT_LIST_FAIL
            );
}

export const detailsProduct = (productId) => async (dispatch) => {
    const url = `/api/products/${productId}`;
    await fetching(
                dispatch,
                method.GET,
                url,
                pc.PRODUCT_DETAILS_REQUEST,
                pc.PRODUCT_DETAILS_SUCCESS,
                pc.PRODUCT_DETAILS_FAIL
            );
}
/*
export const createProduct = () => async (dispatch, getState) => {
    const { userSignin:{userInfo} } = getState();
    const url = '/api/products';
    await fetching(
        dispatch,
        method.POST,
        url,
        pc.PRODUCT_CREATE_REQUEST,
        pc.PRODUCT_CREATE_SUCCESS,
        pc.PRODUCT_CREATE_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    );
}*/

export const createProduct = (product) => async (dispatch, getState) => {
    const { userSignin:{userInfo} } = getState();
    const url = '/api/products';
    await fetching(
        dispatch,
        method.POST,
        url,
        pc.PRODUCT_CREATE_REQUEST,
        pc.PRODUCT_CREATE_SUCCESS,
        pc.PRODUCT_CREATE_FAIL,
        {
            sendData: product,
            header:   {Authorization: `Bearer ${userInfo.token}`}
        }
    );
}

export const updateProduct = (product) => async (dispatch, getState) => {
    const { userSignin:{userInfo} } = getState();
    const url = `/api/products/${product._id}`;
    await fetching(
        dispatch,
        method.PUT,
        url,
        pc.PRODUCT_UPDATE_REQUEST,
        pc.PRODUCT_UPDATE_SUCCESS,
        pc.PRODUCT_UPDATE_FAIL,
        {
            sendData: product,
            header:   {Authorization: `Bearer ${userInfo.token}`}
        }
    );
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
    const { userSignin:{userInfo} } = getState();
    const url = `/api/products/${productId}`;
    await fetching(
        dispatch,
        method.DELETE,
        url,
        pc.PRODUCT_DELETE_REQUEST,
        pc.PRODUCT_DELETE_SUCCESS,
        pc.PRODUCT_DELETE_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    );
}

export const listProductsCategories = () => async (dispatch) => {
    const url = `/api/products/categories`;
    await fetching(
        dispatch,
        method.GET,
        url,
        pc.PRODUCT_CATEGORY_LIST_REQUEST,
        pc.PRODUCT_CATEGORY_LIST_SUCCESS,
        pc.PRODUCT_CATEGORY_LIST_FAIL
    );
}

export const listProductsBrands = () => async (dispatch) => {
    const url = `/api/products/brands`;
    await fetching(
        dispatch,
        method.GET,
        url,
        pc.PRODUCT_BRAND_LIST_REQUEST,
        pc.PRODUCT_BRAND_LIST_SUCCESS,
        pc.PRODUCT_BRAND_LIST_FAIL
    );
}

export const createReview = (productId, review) => async (dispatch, getState) => {
    const { userSignin:{userInfo} } = getState();
    const url = `/api/products/${productId}/reviews`;
    await fetching(
        dispatch,
        method.POST,
        url,
        pc.PRODUCT_REVIEW_CREATE_REQUEST,
        pc.PRODUCT_REVIEW_CREATE_SUCCESS,
        pc.PRODUCT_REVIEW_CREATE_FAIL,
        {
            sendData: review,
            header:   {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}