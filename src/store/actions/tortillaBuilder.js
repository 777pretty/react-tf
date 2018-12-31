import * as actionTypes from './actionTypes';

export const addIng = (name) => {
    return {
        type: actionTypes.ADD_ING,
        ingredientName: name
    }
}

export const removeIng = (name) => {
    return {
        type: actionTypes.REMOVE_ING,
        ingredientName: name
    }
}