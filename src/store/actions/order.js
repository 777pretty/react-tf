import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseTortillaSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_TORTILLA_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseTortillaFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_TORTILLA_FAILED,
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
            dispatch(purchaseTortillaFailed(error))
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT 
    }
};

export const fetchOrdSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORD_SUCCESS,
        orders: orders
    }
};

export const fetchOrdFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORD_FAILED,
        error: error
    }
};

export const fetchOrdBegin = () => {
    return {
        type: actionTypes.FETCH_ORD_BEGIN,
    }
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdBegin());
        axios.get("/orders.json")
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                });
                };
                dispatch(fetchOrdSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdFailed(err));
            });
    };
};

