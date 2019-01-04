import axios from 'axios'

import * as actionTypes from './actionTypes';

export const authBegin = () => {
    return {
        type: actionTypes.AUTH_BEGIN
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 500);
    };
};


export const auth = (email, password, alreadySigned) => {
    return dispatch => {
        dispatch(authBegin());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDIC6Seza-GvgVCjFyviLeY2UcmNF7y9Q4';
        if (!alreadySigned) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDIC6Seza-GvgVCjFyviLeY2UcmNF7y9Q4';
        }
        axios.post(url, authData)
             .then(res => {
                 console.log(res);
                 const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 500);
                 localStorage.setItem('token', res.data.idToken);
                 localStorage.setItem('expirationDate', expirationDate);
                 localStorage.setItem('userId', res.data.localId);
                 dispatch(authSuccess(res.data.idToken, res.data.localId));
                 dispatch(checkAuthTimeout(res.data.expiresIn));
             })
             .catch(err => {
                 dispatch(authFailed(err.response.data.error));
             });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authStateCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                dispatch(authSuccess(token));
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(logout(token, userId));
                dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()));
            };
        };
    };
};