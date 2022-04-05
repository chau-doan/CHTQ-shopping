import * as oc from "../constants/orderConstant";
import {CART_ITEMS} from '../constants/storageConstant';

export const orderCreateReducer = (state={}, action) => {
    switch(action.type){
        case oc.ORDER_CREATE_REQUEST:
            return {
                loading: true,
            };
        case oc.ORDER_CREATE_SUCCESS:
            localStorage.removeItem(CART_ITEMS);
            return {
                loading: false,
                success: true,
                order: action.payload.order
            };
        case oc.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case oc.ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const orderDetailsReducer = (state={loading:true}, action) => {
    switch(action.type){
        case oc.ORDER_DETAIL_REQUEST:
            return {
                loading: true,
            };
        case oc.ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case oc.ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

