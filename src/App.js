import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import TortillaBuilder from './containers/TortillaBuilder/TortillaBuilder';
import Checkout from './containers/Checkout/Checkout'

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <TortillaBuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

//test

export default App;
