import React, { Component } from 'react'

import Aukz from '../../../hoc/Aukz/Aukz'
import Button from '../../UI/Button/Button'

class OrderReview extends Component {
    // this doesnt have to be a stateful component anymore
    componentWillUpdate(){
        console.log('[OrderReview] WillUpdate')
    }

    render(){

        const ingredientsReview = Object.keys(this.props.ingredients)
        .map(ingKey => {
            return <li key={ingKey}> <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]} </li>
        })


        return(
            <Aukz>
             <h2>Review</h2>
             <p>For your tasty Tortilla™ you picked the following ingredients:</p>
             <ul>
                {ingredientsReview}
             </ul>
             <p><strong>Total cost: {this.props.totalCost}€</strong></p>
             <p>Proceed to checkout?</p>
            <Button buttonType="Danger" clickd={this.props.reviewCanceled}>Cancel</Button>
            <Button buttonType="Success" clickd={this.props.reviewContinue}>Continue</Button>
           </Aukz>

        )
    }
}

export default OrderReview