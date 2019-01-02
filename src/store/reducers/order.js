import * as actionTypes from '../actions/actionTypes';
import { updObj } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updObj(state, {purchased: false});
};
const purchaseTortillaBegin = (state, action) => {
    return updObj(state, {loading: true});
};
const purchaseTortillaSuccess = (state, action) => {
    const newWOrder = {
        ...action.orderData,
        id: action.orderId
    };
    return updObj(state, {loading: false,
                          purchased: true,
                          orders: state.orders.concat(newWOrder)});
}
const purchaseTortillaFailed = (state, action) => {
    return updObj(state, {loading: false})
}
const fetchOrdBegin = (state, action) => {
    return updObj(state, {loading: true})
}
const fetchOrdSuccess = (state, action) => {
    return updObj(state, {orders: action.orders,
        loading: false});
}
const fetchOrdFailed = (state, action) => {
    return updObj(state, {loading: false});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_TORTILLA_BEGIN: return purchaseTortillaBegin(state, action);
        case actionTypes.PURCHASE_TORTILLA_SUCCESS: return purchaseTortillaSuccess(state, action);
        case actionTypes.PURCHASE_TORTILLA_FAILED: return purchaseTortillaFailed(state, action);
        case actionTypes.FETCH_ORD_BEGIN: return fetchOrdBegin(state, action);
        case actionTypes.FETCH_ORD_SUCCESS: return fetchOrdSuccess(state, action);
        case actionTypes.FETCH_ORD_FAILED: return fetchOrdFailed(state, action);
        default:
            return state;
    }
};

export default reducer;