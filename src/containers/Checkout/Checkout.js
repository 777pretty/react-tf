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

    render(){
        return(
            <div>
                <CheckoutReview ingredients={this.state.ingredients} />
            </div>

        )
    }
}

export default Checkout