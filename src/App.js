import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import TortillaBuilder from './containers/TortillaBuilder/TortillaBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.onAutoLogInAttempt();
  }

  render () {
    let routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/"  component={TortillaBuilder} />
          <Redirect to="/" />
        </Switch>
    );

    if (this.props.alreadySigned) {
      routes = (
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/"  component={TortillaBuilder} />
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
