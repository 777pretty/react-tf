import React from 'react';
// newcommit
import classes from './Tortilla.css';
import TortillaIngredient from './TortillaIngredient/TortillaIngredient';

const tortilla = ( props ) => {
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <TortillaIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Tortilla}>
            <TortillaIngredient type="bread-top" />
            {transformedIngredients}
            <TortillaIngredient type="bread-bottom" />
        </div>
    );
};

export default tortilla;