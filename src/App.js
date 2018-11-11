import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import TortillaBuilder from './containers/TortillaBuilder/TortillaBuilder';
import Checkout from './containers/Checkout/Checkout'

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Route path="/checkout" Component={Checkout} />
          <Route path="/" exact Component={TortillaBuilder} />
        </Layout>
      </div>
    );
  }
}

//test

export default App;
