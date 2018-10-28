import React from 'react'

const button = (props) => (
    <button onClick={props.clikd}>{props.children}</button>
)

export default button