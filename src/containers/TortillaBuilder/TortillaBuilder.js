import React, { Component } from 'react';

import Aukz from '../../hoc/Aukz';
import Tortilla from '../../components/Tortilla/Tortilla';
import BuildControls from '../../components/Tortilla/BuildControls/BuildControls'


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
        totalCost: 3.30
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
        const costReduction = ING_COST[type]
        const oldCost = this.state.totalCost
        const newCost = oldCost - costReduction
        this.setState({
            totalCost: newCost, 
            ingredients: updIngredients
        })

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
                <Tortilla ingredients={this.state.ingredients} />
                <BuildControls 
                    ingAdded={this.addIngHandler}
                    ingRemoved={this.removeIngHandler}
                    disabled={disabledInf}/>
            </Aukz>
        );
    }
}


export default TortillaBuilder;