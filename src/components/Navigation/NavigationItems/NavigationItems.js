import React from 'react'

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Build a Tortilla</NavigationItem>
        {props.alreadySigned ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.alreadySigned ? <NavigationItem link="/auth">Log In</NavigationItem>
                                     : <NavigationItem link="/logout">Log Out</NavigationItem> }
    </ul>
)

export default navigationItems;