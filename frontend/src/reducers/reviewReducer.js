import * as rc from "../constants/reviewConstant";

export const reviewProductListReducer = (state = {loading:true, reviews:[]}, action) => {
    switch(action.type){
        case rc.REVIEW_PRODUCT_LIST_REQUEST:
            return{
                loading: true
            };
        case rc.REVIEW_PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            };
        case rc.REVIEW_PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const reviewUserListReducer = (state = {loading:true, reviews:[]}, action) => {
    switch(action.type){
        case rc.REVIEW_USER_LIST_REQUEST:
            return{
                loading: true
            };
        case rc.REVIEW_USER_LIST_SUCCESS:
            return {
                loading: false,
                reviews: action.payload.reviews,
                count: action.payload.count
            };
        case rc.REVIEW_USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case rc.REVIEW_USER_LIST_RESET:
            return {};
        default:
            return state;
    }
}

export const reviewDeleteReducer = (state={loading:false}, action) => {
    switch (action.type){
        case rc.REVIEW_DELETE_REQUEST:
            return{
                loading: true
            };
        case rc.REVIEW_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case rc.REVIEW_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case rc.REVIEW_DELETE_RESET:
            return {};
        default:
            return state;
    }
}

export const reviewCreateReducer = (state={loading: false}, action) => {
    switch (action.type) {
        case rc.REVIEW_CREATE_REQUEST:
            return {
                loading: true
            };
        case rc.REVIEW_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case rc.REVIEW_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case rc.REVIEW_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const reviewUpdateReducer = (state={loading: false}, action) => {
    switch (action.type) {
        case rc.REVIEW_UPDATE_REQUEST:
            return {
                loading: true
            };
        case rc.REVIEW_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case rc.REVIEW_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case rc.REVIEW_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}