import * as actionTypes from '../actions/actionTypes';
import { updObj } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalCost: 2.30,
    error: false,
    building: false
};

const ING_COST = {
    salad: 0.5,
    dressing: 0.5,
    meat: 0.9,    //high quality kebab meat 
    tomato: 0.6,
    onion: 0.3
}

const addIng = (state, action) => {
    const updIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updIngredients = updObj(state.ingredients, updIngredient);
            const updState = {
                    ingredients: updIngredients,
                    totalCost: state.totalCost + ING_COST[action.ingredientName],
                    building: true
            }
        return updObj(state, updState);
};

const removeIng = (state, action) => {
    const updIngredientR = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updIngredientsR = updObj(state.ingredients, updIngredientR);
            const updStateR = {
                    ingredients: updIngredientsR,
                    totalCost: state.totalCost - ING_COST[action.ingredientName],
                    building: true
            }
        return updObj(state, updStateR);
};

const setIng = (state, action) => {
    return updObj(state, {
        ingredients: {
            salad: action.ingredients.salad,
            dressing: action.ingredients.dressing,
            tomato: action.ingredients.tomato,
            onion: action.ingredients.onion,
            meat: action.ingredients.meat
        },
        totalCost: 2.30,
        error: false,
        building: false
    });
}

const fetchIngFailed = (state, action) => {
    return updObj(state, {error: true});
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_ING: return addIng(state, action)
        case actionTypes.REMOVE_ING: return removeIng(state, action)       
        case actionTypes.SET_ING: return setIng(state, action)
        case actionTypes.FETCH_ING_FAILED: return fetchIngFailed(state, action)
        default:
            return state;
    }
};

export default reducer;