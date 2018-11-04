import React from 'react';

import Tortilla from '../../Tortilla/Tortilla';
import Button from '../../UI/Button/Button';
import classes from './CheckoutReview.css';

const checkoutReview = (props) => {
    return (
        <div className={classes.CheckoutReview}>
            <h1>Almost there! :)</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Tortilla ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clickd >Cancel</Button>
            <Button btnType="Success" clickd >Proceed</Button>
        </div>
    );
}

export default checkoutReview;