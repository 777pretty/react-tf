import React, { Component } from 'react';

import Aukz from '../../hoc/Aukz/Aukz';
import Tortilla from '../../components/Tortilla/Tortilla';
import BuildControls from '../../components/Tortilla/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderReview from '../../components/Tortilla/OrderReview/OrderReview'
import axios from '../../axios-orders'



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
        ingredients: {
            salad: 0,
            tomato: 0,
            meat: 0,
            onion: 0,
            dressing: 0
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
        // alert('You have selected continue.')
        const order = {
            ingredients: this.state.ingredients,
            cost: this.state.totalCost,
            customer: {
                name: 'Roland Royce',
                address: {
                    street: 'Test street',
                    zipcode: 123456,
                    country: 'Roman Empire'
                },
                email: 'royce@gmail.com'
            },
            deliveryMethod: 'Express One'
        };
        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error));

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
                                 reviewContinue={this.reviewContinueHandler} 
                                 totalCost={this.state.totalCost.toFixed(2)}/>    
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