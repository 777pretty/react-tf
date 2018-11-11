import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import TortillaBuilder from './containers/TortillaBuilder/TortillaBuilder';
import Checkout from './containers/Checkout/Checkout'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <TortillaBuilder />
            <Checkout />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

//test

export default App;
