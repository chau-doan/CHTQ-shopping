import * as pc from "../constants/productConstant";

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch(action.type){
        case pc.PRODUCT_LIST_REQUEST:
            return {
                loading:    true
            };
        case pc.PRODUCT_LIST_SUCCESS:
            return {
                loading:    false,
                products:   action.payload.products,
                pages:      action.payload.pages,
                page:       action.payload.page,
            };
        case pc.PRODUCT_LIST_FAIL:
            return {
                loading:    false,
                error:      action.payload
            };
        default:
            return state;
    }
}


export const productCategoryListReducer = (state = { loading: true, products: [] }, action) => {
    switch(action.type){
        case pc.PRODUCT_CATEGORY_LIST_REQUEST:
            return {
                loading:    true
            };
        case pc.PRODUCT_CATEGORY_LIST_SUCCESS:
            return {
                loading:    false,
                categories: action.payload
            };
        case pc.PRODUCT_CATEGORY_LIST_FAIL:
            return {
                loading:    false,
                error:      action.payload
            };
        default:
            return state;
    }
}

export const productBrandListReducer = (state = { loading: true, products: [] }, action) => {
    switch(action.type){
        case pc.PRODUCT_BRAND_LIST_REQUEST:
            return {
                loading:    true
            };
        case pc.PRODUCT_BRAND_LIST_SUCCESS:
            return {
                loading:    false,
                brands:   action.payload
            };
        case pc.PRODUCT_BRAND_LIST_FAIL:
            return {
                loading:    false,
                error:      action.payload
            };
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { loading: true}, action) => {
    switch(action.type){
        case pc.PRODUCT_DETAILS_REQUEST:
            return {
                loading: true
            };
        case pc.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case pc.PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const productCreateReducer = (state={}, action) => {
    switch(action.type){
        case pc.PRODUCT_CREATE_REQUEST:
            return {
                loading: true,
            };
        case pc.PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload.product,
            };
        case pc.PRODUCT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case pc.PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const productUpdateReducer = (state = {}, action) => {
    switch(action.type){
        case pc.PRODUCT_UPDATE_REQUEST:
            return {
                loading: true,
            };
        case pc.PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case pc.PRODUCT_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case pc.PRODUCT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case pc.PRODUCT_DELETE_REQUEST:
            return {
                loading: true,
            };
        case pc.PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case pc.PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case pc.PRODUCT_DELETE_RESET:
            return {};
        default:
            return state;
    }
}

export const productReviewCreateReducer = (state={}, action) => {
    switch(action.type){
        case pc.PRODUCT_REVIEW_CREATE_REQUEST:
            return {
                loading: true,
            };
        case pc.PRODUCT_REVIEW_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                review: action.payload.review,
            };
        case pc.PRODUCT_REVIEW_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case pc.PRODUCT_REVIEW_CREATE_RESET:
            return {};
        default:
            return state;
    }
}