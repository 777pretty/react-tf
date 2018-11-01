import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './TortillaIngredient.css';

class TortillaIngredient extends Component {
    render () {
        let ingredient = null;

        switch ( this.props.type ) {
            case ( 'bread-bottom' ):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ( 'bread-top' ):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ( 'meat' ):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ( 'dressing' ):
                ingredient = <div className={classes.Dressing}></div>;
                break;
            case ( 'tomato' ):
                ingredient = <div className={classes.Tomato}></div>;
                break;
            case ( 'salad' ):
                ingredient = <div className={classes.Salad}></div>;
                break;
            case ( 'onion' ):
                ingredient = <div className={classes.Onion}></div>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

TortillaIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default TortillaIngredient;