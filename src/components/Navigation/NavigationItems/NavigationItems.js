import React from 'react'

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Build a Tortilla</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {!props.alreadyAuthenticated ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                                    : <NavigationItem link="/logout">Log Out</NavigationItem> }
    </ul>
)

export default navigationItems;