import React, { Component } from 'react';

import Aukz from '../../hoc/Aukz';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        dispSideDrawer: true
    }

    sideDrawerShutHandler = () => {
        this.setState({
            dispSideDrawer: false
        })
    }

    render(){
    return(
    <Aukz>
        <Toolbar />
        <SideDrawer open={this.state.dispSideDrawer} 
                    shut={this.sideDrawerShutHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aukz>
    )
}
};

export default Layout;