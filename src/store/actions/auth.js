import axios from 'axios'

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
             .then(response => {
                 console.log(response);
                 dispatch(authSuccess(response.data))
             })
             .catch(err => {
                 console.log(err);
                 dispatch(authFailed(err))
             });
    };
};
