import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import TortillaBuilder from './containers/TortillaBuilder/TortillaBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
});

class App extends Component {

  componentDidMount(){
    this.props.onAutoLogInAttempt();
  }

  render () {
    let routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/"  component={TortillaBuilder} />
          <Redirect to="/" />
        </Switch>
    );

    if (this.props.alreadySigned) {
      routes = (
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={TortillaBuilder} />
            <Redirect to="/" />
          </Switch> 
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

//test

const mapStateToProps = state => {
  return {
    alreadySigned: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogInAttempt: () => dispatch(actions.authStateCheck()) 
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
