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

export const purchaseTortillaBegin = () => {
    return {
        type: actionTypes.PURCHASE_TORTILLA_BEGIN
    }
}

export const purchaseTortilla = (orderData) => {
    return dispatch => {
        dispatch(purchaseTortillaBegin());
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response.data)
            dispatch(purchaseTortillaSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseTortillaFail(error))
        });
    };
};