import React, { Component } from 'react';

import CheckoutReview from '../../components/Order/CheckoutReview/CheckoutReview';


class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            dressing: 1
        }
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutReview ingredients={this.state.ingredients}
                                checkoutCancelled={this.checkoutCancelledHandler}
                                checkoutContinued={this.checkoutContinuedHandler}  />
            </div>

        )
    }
}

export default Checkout