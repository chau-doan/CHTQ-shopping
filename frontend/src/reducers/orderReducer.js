import * as oc from '../constants/orderConstant'

export const orderListMineReducer = (state={orders:[]}, action) => {
    switch(action.type){
        case oc.ORDER_MINE_LIST_REQUEST:
            return{
                loading:    true
            };
        case oc.ORDER_MINE_LIST_SUCCESS:
            return {
                loading:    false,
                orders:     action.payload.orders,
                pages:      action.payload.pages,
                page:       action.payload.page,
            }
        case oc.ORDER_MINE_LIST_FAIL:
            return {
                loading:    false,
                error:     action.payload,
            }
        default:
            return state;
    }
}

export const orderListReducer = (state={orders:[]}, action) => {
    switch(action.type){
        case oc.ORDER_LIST_REQUEST:
            return{
                loading: true
            };
        case oc.ORDER_LIST_SUCCESS:
            return {
                loading:    false,
                orders:     action.payload.orders,
                pages:      action.payload.pages,
                page:       action.payload.page,
            }
        case oc.ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const orderListUserReducer = (state={orders:[]}, action) => {
    switch(action.type){
        case oc.ORDER_LIST_USER_REQUEST:
            return{
                loading: true
            };
        case oc.ORDER_LIST_USER_SUCCESS:
            return {
                loading:    false,
                orders:     action.payload.orders,
                count:      action.payload.count,
                pages:      action.payload.pages,
                page:       action.payload.page,
            }
        case oc.ORDER_LIST_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case oc.ORDER_LIST_USER_RESET:
            return {};
        default:
            return state;
    }
}

export const orderDeleteReducer = (state={}, action) => {
    switch(action.type){
        case oc.ORDER_DELETE_REQUEST:
            return{
                loading: true
            };
        case oc.ORDER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case oc.ORDER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case oc.ORDER_DELETE_RESET:
            return {};
        default:
            return state;
    }
}

export const orderPayReducer = (state={}, action) => {
    switch(action.type){
        case oc.ORDER_PAY_REQUEST:
            return {
                loading: true,
            };
        case oc.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case oc.ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case oc.ORDER_PAY_RESET:
            return {};
        default:
            return state;

    }
}

export const orderDeliverReducer = (state={}, action) => {
    switch(action.type){
        case oc.ORDER_DELIVER_REQUEST:
            return {
                loading: true,
            };
        case oc.ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case oc.ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case oc.ORDER_DELIVER_RESET:
            return {};
        default:
            return state;

    }
}

export const orderRequestCancelReducer = (state={}, action) => {
    switch(action.type){
        case oc.ORDER_REQUEST_CANCEL_REQUEST:
            return {
                loading: true,
            };
        case oc.ORDER_REQUEST_CANCEL_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case oc.ORDER_REQUEST_CANCEL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case oc.ORDER_REQUEST_CANCEL_RESET:
            return {};
        default:
            return state;
    }
}

export const orderConfirmCancelReducer = (state={}, action) => {
    switch(action.type){
        case oc.ORDER_CANCEL_REQUEST:
            return {
                loading: true,
            };
        case oc.ORDER_CANCEL_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case oc.ORDER_CANCEL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case oc.ORDER_CANCEL_RESET:
            return {};
        default:
            return state;
    }
}

export const orderSumaryReducer = (state={loading: true, summary: {}}, action) => {
    switch(action.type){
        case oc.ORDER_SUMMARY_REQUEST:
            return {
                loading: true,
            }
        case oc.ORDER_SUMMARY_SUCCESS:
            return {
                loading: false,
                summary: action.payload,
            }
        case oc.ORDER_SUMMARY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}