import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutReview from '../../components/Order/CheckoutReview/CheckoutReview';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

    state = {
        ingredients: null,
        cost: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let cost = 0;
        for (let param of query.entries()) {
            if (param[0] === 'cost') {
                cost = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }

        }
        this.setState({ingredients: ingredients,
                       totalCost: cost});
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
                <Route path={this.props.match.path + '/contact-data'} 
                       render={(props) => (<ContactData ingredients={this.state.ingredients} 
                                                   cost={this.state.totalCost}
                                                   {...props}/>)} />
            </div>

        )
    }
}

export default Checkout