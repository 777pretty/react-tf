import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutReview from '../../components/Order/CheckoutReview/CheckoutReview';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let review = <Redirect to="/" />
        if (this.props.ings) {
            const redirectPurchased = this.props.purch ? <Redirect to="/" /> : null
            review = (
                <div>
                    {redirectPurchased}
                    <CheckoutReview ingredients={this.props.ings}
                                    checkoutCancelled={this.checkoutCancelledHandler}
                                    checkoutContinued={this.checkoutContinuedHandler}  />
                    <Route path={this.props.match.path + '/contact-data'} 
                                    component={ContactData} />
                </div>
            );
        };
        return review
    };
};

const mapStateToProps = state => {
    return {
        ings: state.tortillaBuilder.ingredients,
        purch: state.order.purchased
    };
};


export default connect(mapStateToProps)(Checkout);