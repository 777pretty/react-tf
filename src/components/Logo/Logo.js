import React from 'react'

import lev2 from '../../assets/images/lev2.png'
import classes from './Logo.css'


const logo = (props) => (
    <div className={classes.Logo}>
        <img src={lev2} alt="Lion Tortilla™"/>
    </div>
)

export default logo