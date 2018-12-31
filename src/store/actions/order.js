import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseTortillaSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_TORTILLA_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseTortillaFail = (error) => {
    return {
        type: actionTypes.PURCHASE_TORTILLA_FAIL,
        error: error
    };
};

export const purchaseTortillaBegin = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response.data)
            dispatch(purchaseTortillaSuccess(response.data, orderData))
        })
        .catch(error => {
            dispatch(purchaseTortillaFail(error))
        });
    };
};