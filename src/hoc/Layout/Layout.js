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

    sideDrawerShutHandler = () => {
        this.setState({
            dispSideDrawer: false
        })
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
           return {dispSideDrawer: !prevState.dispSideDrawer}
        })
    }    


    render(){
    return(
    <Aukz>
        <Toolbar alreadySigned={this.props.alreadySigned}
                 offnen={this.sideDrawerOpenHandler}/>
        <SideDrawer open={this.state.dispSideDrawer} 
                    shut={this.sideDrawerShutHandler}
                    alreadySigned={this.props.alreadySigned}
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
        alreadySigned: state.auth.token !== null
    };
};

export default connect(mapStateToProps, null)(Layout);