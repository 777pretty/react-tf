import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aukz from '../Aukz/Aukz';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        dispSideDrawer: false
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
           return {dispSideDrawer: !prevState.dispSideDrawer}
        })
    }    

    sideDrawerShutHandler = () => {
        this.setState({
            dispSideDrawer: false
        })
    }

    render(){
    return(
    <Aukz>
        <Toolbar alreadyAuth={this.props.alreadyAuthenticated}
                 offnen={this.sideDrawerOpenHandler}/>
        <SideDrawer open={this.state.dispSideDrawer} 
                    shut={this.sideDrawerShutHandler}
                    onClick={this.sideDrawerShutHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aukz>
    )
}
};

const mapStateToProps = state => {
    return {
        alreadyAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps, null)(Layout);