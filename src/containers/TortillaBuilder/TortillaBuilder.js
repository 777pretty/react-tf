import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aukz from '../../hoc/Aukz/Aukz';
import Tortilla from '../../components/Tortilla/Tortilla';
import BuildControls from '../../components/Tortilla/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderReview from '../../components/Tortilla/OrderReview/OrderReview';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';



// const ING_COST = {
//     salad: 0.5,
//     dressing: 0.5,
//     meat: 0.9,    //high quality kebab meat 
//     tomato: 0.6,
//     onion: 0.3
// }

class TortillaBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        reviewing: false
    }

    componentDidMount(){
        console.log(this.props);
        this.props.onIngredientInit();
    };

    updateOrderableState(ingredients){
        const total = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce((total, el) => {
                return total + el
            }, 0)
        return total > 0;
    }

    // addIngHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     const updCount = oldCount + 1
    //     const updIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updIngredients[type] = updCount
    //     const costAddition = ING_COST[type]
    //     const oldCost = this.state.totalCost
    //     const newCost = oldCost + costAddition
    //     this.setState({
    //         totalCost: newCost, 
    //         ingredients: updIngredients
    //     })
    //     this.updateOrderableState(updIngredients)
    //     }
    

    // removeIngHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     if (oldCount <= 0){
    //         return
    //     }
    //     const updCount = oldCount - 1
    //     const updIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updIngredients[type] = updCount
    //     const costDeduction = ING_COST[type]
    //     const oldCost = this.state.totalCost
    //     const newCost = oldCost - costDeduction
    //     this.setState({
    //         totalCost: newCost, 
    //         ingredients: updIngredients
    //     })
    //     this.updateOrderableState(updIngredients)
    // }

    reviewHandler = () => {
        if (this.props.alreadySigned) {
        this.setState({
            reviewing: true
        })
        } else {
            this.props.onRedirectPathSet('/checkout');
            this.props.history.push('/auth');
        }
    }
    

    reviewOutHandler = () => {
        this.setState({
            reviewing: false
        })
    }

    reviewContinueHandler = () => {
            this.props.onPurchaseInit();
            this.props.history.push('/checkout');
    };

    render() {

        const disabledInf = {
            ...this.props.ings
        }
        for (let key in disabledInf){
            disabledInf[key] = disabledInf[key] <= 0
        }
        let orderReview = null;
        let tortilla = this.props.error ? <p>Ingredients were unable to load.</p> : <span style={{margin: 1}}><Spinner /></span>;
        
        if (this.props.ings) {
            tortilla = <Aukz>
                            <Tortilla ingredients={this.props.ings} />
                            <BuildControls 
                                ingredientAdded={this.props.onIngredientAdded}
                                ingredientRemoved={this.props.onIngredientRemoved}
                                disabled={disabledInf}
                                cost={this.props.cost}
                                ordered={this.reviewHandler}
                                orderable={this.updateOrderableState(this.props.ings)}
                                alreadySig={this.props.alreadySigned}/>
                        </Aukz>;
            orderReview = <OrderReview  ingredients={this.props.ings}
                                        reviewCanceled={this.reviewOutHandler}
                                        reviewContinue={this.reviewContinueHandler} 
                                        totalCost={this.props.cost.toFixed(2)}/>;   
        }
                        
        return (
            <Aukz>
                <Modal disp={this.state.reviewing} modalOut={this.reviewOutHandler}>  
                {orderReview}
                </Modal>
                {tortilla}
            </Aukz>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.tortillaBuilder.ingredients,
        cost: state.tortillaBuilder.totalCost,
        error: state.tortillaBuilder.error,
        alreadySigned: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIng(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIng(ingName)),
        onIngredientInit: () => dispatch(actions.initIng()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onRedirectPathSet: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(TortillaBuilder, axios));