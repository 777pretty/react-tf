import * as actionTypes from './actionTypes';

export const authBegin = () => {
    return {
        type: actionTypes.AUTH_BEGIN
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authBegin());
    };
};
