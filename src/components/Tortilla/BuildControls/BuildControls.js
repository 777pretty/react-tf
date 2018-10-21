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
        {controls.map(controlla => (
            <BuildControl key={controlla.label} 
                          label={controlla.label}
                          added={() => props.ingAdded(controlla.type)}
                          removed={() => props.ingRemoved(controlla.type)}/>
        ))}
        
    </div>
)

export default buildControls