import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/"  component={TortillaBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

//test

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogInAttempt: () => dispatch(actions.authStateCheck()) 
  };
};

export default connect(null, mapDispatchToProps)(App);
