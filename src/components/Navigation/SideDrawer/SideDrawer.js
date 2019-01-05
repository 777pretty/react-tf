import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aukz from '../../../hoc/Aukz/Aukz';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Aukz>
        <Backdrop disp={props.open} clickd={props.shut} />
        <div className={attachedClasses.join(' ')} onClick={props.shut}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems alreadySigned={props.alreadyAuth} />
            </nav>
        </div>
        </Aukz>
    )
}

export default sideDrawer