import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalCost: 2.30,
    error: false
};

const ING_COST = {
    salad: 0.5,
    dressing: 0.5,
    meat: 0.9,    //high quality kebab meat 
    tomato: 0.6,
    onion: 0.3
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_ING:
            return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                    },
                    totalCost: state.totalCost + ING_COST[action.ingredientName]
            };
        case actionTypes.REMOVE_ING:
            return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    },
                    totalCost: state.totalCost - ING_COST[action.ingredientName]
            };
        case actionTypes.SET_ING:
            return {
                    ...state,
                    ingredients: {
                        salad: action.ingredients.salad,
                        dressing: action.ingredients.dressing,
                        tomato: action.ingredients.tomato,
                        onion: action.ingredients.onion,
                        meat: action.ingredients.meat
                    },
                    error: false
            };
        case actionTypes.FETCH_ING_FAILED:
            return {
                    ...state,
                    error: true
            }
        default:
            return state;
    }
};

export default reducer;