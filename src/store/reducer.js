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
        default:
            return state;
    }
};

export default reducer;