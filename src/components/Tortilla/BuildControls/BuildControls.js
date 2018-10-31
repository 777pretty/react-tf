import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}   
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <h3>{props.cost === 2.30 ? 'Starting cost:' : 'Current cost'} <strong>{props.cost.toFixed(2)}€</strong></h3>
        {controls.map(controlla => (
            <BuildControl key={controlla.label} 
                          label={controlla.label}
                          added={() => props.ingAdded(controlla.type)}
                          removed={() => props.ingRemoved(controlla.type)}
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