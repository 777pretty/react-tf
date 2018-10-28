import React, { Component } from 'react';

import Aukz from '../../hoc/Aukz';
import Tortilla from '../../components/Tortilla/Tortilla';
import BuildControls from '../../components/Tortilla/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderReview from '../../components/Tortilla/OrderReview/OrderReview'


const ING_COST = {
    salad: 0.5,
    cheese: 0.5,
    meat: 0.9,    //high quality kebab meat 
    bacon: 0.6
}

class TortillaBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalCost: 2.30,
        orderable: false,
        reviewing: false
    }

    updateOrderableState(ingredients){
        const total = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce((total, el) => {
                return total + el
            }, 0)
            this.setState({orderable: total > 0})
    }

    addIngHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updCount = oldCount + 1
        const updIngredients = {
            ...this.state.ingredients
        }
        updIngredients[type] = updCount
        const costAddition = ING_COST[type]
        const oldCost = this.state.totalCost
        const newCost = oldCost + costAddition
        this.setState({
            totalCost: newCost, 
            ingredients: updIngredients
        })
        this.updateOrderableState(updIngredients)
        }
    

    removeIngHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0){
            return
        }
        const updCount = oldCount - 1
        const updIngredients = {
            ...this.state.ingredients
        }
        updIngredients[type] = updCount
        const costDeduction = ING_COST[type]
        const oldCost = this.state.totalCost
        const newCost = oldCost - costDeduction
        this.setState({
            totalCost: newCost, 
            ingredients: updIngredients
        })
        this.updateOrderableState(updIngredients)
    }

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
        alert('You have selected continue.')
    }

    render() {
        const disabledInf = {
            ...this.state.ingredients
        }
        for (let key in disabledInf){
            disabledInf[key] = disabledInf[key] <= 0
        }
        return (
            <Aukz>
                <Modal disp={this.state.reviewing} modalOut={this.reviewOutHandler}>
                    <OrderReview ingredients={this.state.ingredients}
                                 reviewCanceled={this.reviewOutHandler}
                                 reviewContinued={this.reviewContinueHandler} />    
                </Modal>
                <Tortilla ingredients={this.state.ingredients} />
                <BuildControls 
                    ingAdded={this.addIngHandler}
                    ingRemoved={this.removeIngHandler}
                    disabled={disabledInf}
                    cost={this.state.totalCost}
                    ordered={this.reviewHandler}
                    orderable={this.state.orderable}/>
            </Aukz>
        );
    }
}


export default TortillaBuilder;