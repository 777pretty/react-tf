import React from 'react';
import { withRouter } from 'react-router-dom'

import classes from './Tortilla.css';
import TortillaIngredient from './TortillaIngredient/TortillaIngredient';
//commitTest3
const tortilla = ( props ) => {
    let transformedIngredients = Object.keys( props.ingredients )
           .map(ingKey => {
               return [...Array(props.ingredients[ingKey])].map((_,i) => {
                   return <TortillaIngredient key={ingKey + i} type={ingKey} />
               })
           } )
           .reduce((arr, el) => {
               return arr.concat(el)
           }, [])
        if (transformedIngredients.length === 0){
            transformedIngredients = <p><span>Please, start adding ingredients</span></p>
        }
    return (
        <div className={classes.Tortilla}>
            <TortillaIngredient type="bread-top" />
            {transformedIngredients}
            <TortillaIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(tortilla);