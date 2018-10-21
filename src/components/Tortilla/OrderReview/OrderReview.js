import React from 'react'

import Aukz from '../../../hoc/Aukz'

const orderReview = (props) => {
    const ingredientsReview = Object.keys(props.ingredients)
        .map(ingKey => {
            return <li key={ingKey}> <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]} </li>
        })

    return <Aukz>
             <h2>Review</h2>
             <p>For your tasty Tortilla™ you picked the following ingredients:</p>
             <ul>
                {ingredientsReview}
             </ul>
             <p>Proceed to checkout</p>
           </Aukz>

}

export default orderReview