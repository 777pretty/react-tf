import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        tomato: 0,
        meat: 0,
        onion: 0,
        dressing: 0
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
                        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                    }
            };
        case actionTypes.REMOVE_ING:
            return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    }
            };
        default:
            return state;
    }
};

export default reducer;