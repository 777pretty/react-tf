import React from 'react'

import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
// import sideDrawer from '../SideDrawer/SideDrawer'

const toolbar = (props) => (
<header className={classes.Toolbar}> 
        <div className={classes.MenuButton} onClick={props.offnen}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems alreadySigned={props.alreadyAuth}/>
        </nav>
    </header>
)

export default toolbar