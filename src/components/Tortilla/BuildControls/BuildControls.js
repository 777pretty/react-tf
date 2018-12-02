import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Tomato', type: 'tomato'},
    {label: 'Meat', type: 'meat'},
    {label: 'Onion', type: 'onion'},
    {label: 'Dressing', type: 'dressing'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <h3>{props.cost === 2.30 ? 'Starting cost:' : 'Current cost'} <strong>{props.cost.toFixed(2)}€</strong></h3>
        {controls.map(controlla => (
            <BuildControl key={controlla.label} 
                          label={controlla.label}
                          added={() => props.ingredientAdded(controlla.type)}
                          removed={() => props.ingredientRemoved(controlla.type)}
                          disabled={props.disabled[controlla.type]}
                          />
        ))}
        <button className={classes.OrderButton} 
                disabled={!props.orderable} 
                onClick={props.ordered}>
                CONFIRM ORDER</button>
    </div>
)

export default buildControls