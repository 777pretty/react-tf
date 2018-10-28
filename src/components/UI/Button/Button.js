import React from 'react'

import Button from './Button.css'

const button = (props) => (
    <button onClick={props.clikd}>{props.children}</button>
)

export default button