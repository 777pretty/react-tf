import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIng = (name) => {
    return {
        type: actionTypes.ADD_ING,
        ingredientName: name
    };
};

export const removeIng = (name) => {
    return {
        type: actionTypes.REMOVE_ING,
        ingredientName: name
    };
};

export const setIng = (ingos) => {
    return {
        type: actionTypes.SET_ING,
        ingredients: ingos
    };
};

export const fetchIngFailed = () => {
    return {
        type: actionTypes.FETCH_ING_FAILED
    };
};

export const initIng = () => {
    return dispatch => {
        axios.get("https://react-tf.firebaseio.com/ingredients.json")
            .then(response => {
                dispatch(setIng(response.data));
            })
            .catch(error => {
                dispatch(fetchIngFailed());
            });
    }
};