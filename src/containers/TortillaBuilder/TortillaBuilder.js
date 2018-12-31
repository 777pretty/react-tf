import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aukz from '../../hoc/Aukz/Aukz';
import Tortilla from '../../components/Tortilla/Tortilla';
import BuildControls from '../../components/Tortilla/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderReview from '../../components/Tortilla/OrderReview/OrderReview';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as tortillaBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';



const ING_COST = {
    salad: 0.5,
    dressing: 0.5,
    meat: 0.9,    //high quality kebab meat 
    tomato: 0.6,
    onion: 0.3
}

class TortillaBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        reviewing: false
    }

    componentDidMount(){
        console.log(this.props)

    }

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
        this.setState({
            reviewing: true
        })
    }

    reviewOutHandler = () => {
        this.setState({
            reviewing: false
        })
    }

    reviewContinueHandler = () => {
            this.props.history.push('/checkout');
    }

    render() {
        const disabledInf = {
            ...this.props.ings
        }
        for (let key in disabledInf){
            disabledInf[key] = disabledInf[key] <= 0
        }
        let orderReview = null;
        let tortilla = this.state.error ? <p>Ingredients were unable to load.</p> : <span style={{margin: 1}}><Spinner /></span>;
        
        if (this.props.ings) {
            tortilla = <Aukz>
                            <Tortilla ingredients={this.props.ings} />
                            <BuildControls 
                                ingredientAdded={this.props.onIngredientAdded}
                                ingredientRemoved={this.props.onIngredientRemoved}
                                disabled={disabledInf}
                                cost={this.props.cost}
                                ordered={this.reviewHandler}
                                orderable={this.updateOrderableState(this.props.ings)}/>
                        </Aukz>;
            orderReview = <OrderReview  ingredients={this.props.ings}
                                        reviewCanceled={this.reviewOutHandler}
                                        reviewContinue={this.reviewContinueHandler} 
                                        totalCost={this.props.totalCost}/>;   
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
        ings: state.ingredients,
        cost: state.totalCost
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(tortillaBuilderActions.addIng(ingName)),
        onIngredientRemoved: (ingName) => dispatch(tortillaBuilderActions.removeIng(ingName))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(TortillaBuilder, axios));