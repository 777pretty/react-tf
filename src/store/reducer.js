import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        meat: 0,
        dressing: 0,
        tomato: 0,
        salad: 0,
        onion: 0
    },
    totalCost: 2.30
};

const reducer = (state = initialState, action) => {
    switch (action.types){
        case actionTypes.ADD_ING:
            return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingName]: state.ingredients[action.ingName] + 1
                    }
            };
        case actionTypes.REMOVE_ING:
            return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingName]: state.ingredients[action.ingName] - 1
                    }
            };
        default:
            return state;
    }
};

export default reducer;