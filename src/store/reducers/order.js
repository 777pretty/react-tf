import * as actionTypes from '../actions/actionTypes';
import { updObj } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updObj(state, {purchased: false});
        case actionTypes.PURCHASE_TORTILLA_BEGIN:
            return updObj(state, {loading: true});
        case actionTypes.PURCHASE_TORTILLA_SUCCESS:
            const newWOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return updObj(state, {loading: false,
                                  purchased: true,
                                  orders: state.orders.concat(newWOrder)});
        case actionTypes.PURCHASE_TORTILLA_FAILED:
            return updObj(state, {loading: false})
        case actionTypes.FETCH_ORD_BEGIN:
            return updObj(state, {loading: true})
        case actionTypes.FETCH_ORD_SUCCESS:
            return updObj(state, {orders: action.orders,
                                  loading: false});
        case actionTypes.FETCH_ORD_FAILED:
            return updObj(state, {loading: false});
        default:
            return state;
    }
};

export default reducer;