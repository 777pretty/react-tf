import React from 'react'

import classes from './Backdrop.css'

const backdrop = (props) => (
    props.disp ? <div className={classes.Backdrop} onClick={props.cliked}></div> : null
)

export default backdrop