import * as actionTypes from '../actions/actionTypes'
import { updObj } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
};

const authBegin = (state, action) => {
    return updObj(state, {error: null, loading: true})
};

const authSuccess = (state, action) => {
    return updObj(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFailed = (state, action) => {
    return updObj(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updObj(state, {
        token: null,
        userId: null
    })
};

const setAuthRedirectPath = (state, action) => {
    return updObj(state, {
        authRedirectPath: action.path
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_BEGIN: return authBegin(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;