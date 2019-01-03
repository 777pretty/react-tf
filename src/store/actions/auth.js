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
                 dispatch(authSuccess(res.data.idToken, res.data.localId));
             })
             .catch(err => {
                 dispatch(authFailed(err.response.data.error));
             });
    };
};
