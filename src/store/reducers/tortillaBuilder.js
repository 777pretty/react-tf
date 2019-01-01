import * as actionTypes from '../actions/actionTypes';
import { updObj } from '../utility';

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
            const updIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updIngredients = updObj(state.ingredients, updIngredient);
            const updState = {
                    ingredients: updIngredients,
                    totalCost: state.totalCost + ING_COST[action.ingredientName]
            }
        return updObj(state, updState);
        case actionTypes.REMOVE_ING:
            const updIngredientR = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updIngredientsR = updObj(state.ingredients, updIngredient);
            const updStateR = {
                    ingredients: updIngredients,
                    totalCost: state.totalCost - ING_COST[action.ingredientName]
            }
        return updObj(state, updStateR);
        case actionTypes.SET_ING:
        return updObj(state, {
            ingredients: {
                salad: action.ingredients.salad,
                dressing: action.ingredients.dressing,
                tomato: action.ingredients.tomato,
                onion: action.ingredients.onion,
                meat: action.ingredients.meat
            },
            totalCost: 2.30,
            error: false
        });
        case actionTypes.FETCH_ING_FAILED:
            return updObj(state, {error: true});
        default:
            return state;
    }
};

export default reducer;