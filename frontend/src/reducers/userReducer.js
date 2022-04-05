import * as uc from '../constants/userConstant'

export const userSigninReducer = (state = {}, action) => {
    switch(action.type){
        case uc.USER_SIGNIN_REQUEST:
            return {
                loading: true,
            };
        case uc.USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            };
        case uc.USER_SIGNIN_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case uc.USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case uc.USER_REGISTER_REQUEST:
            return {
                loading: true,
            };
        case uc.USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            };
        case uc.USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const userDetailsReducer = (state = {loading: true}, action) => {
    switch(action.type){
        case uc.USER_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case uc.USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            };
        case uc.USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case uc.USER_DETAILS_RESET:
            return {
                loading: true
            };
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch(action.type){
        case uc.USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
            }
        case uc.USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case uc.USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case uc.USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
}

export const userListReducer = (state={loading: true}, action) => {
    switch(action.type){
        case uc.USER_LIST_REQUEST:
            return {
                loading: true,
            };
        case uc.USER_LIST_SUCCESS:
            return {
                loading: false,
                users:      action.payload.users,
                pages:      action.payload.pages,
                page:       action.payload.page,
            };
        case uc.USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const userDeleteReducer = (state={}, action) => {
    switch(action.type){
        case uc.USER_DELETE_REQUEST:
            return {
                loading: true,
            };
        case uc.USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case uc.USER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case uc.USER_DELETE_RESET:
            return {};
        default:
            return state;
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch(action.type){
        case uc.USER_UPDATE_REQUEST:
            return {
                loading: true,
            }
        case uc.USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case uc.USER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case uc.USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const userAddressMapReducer = (state={}, action) => {
    switch(action.type){
        case uc.USER_ADDRESS_MAP_CONFIRM:
            return {
                address: action.payload,
            };
        default:
            return state;
    }
};