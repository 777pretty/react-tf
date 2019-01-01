import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_TORTILLA_BEGIN:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_TORTILLA_SUCCESS:
            const newWOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newWOrder)
            };
        case actionTypes.PURCHASE_TORTILLA_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;