import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import TortillaBuilder from './containers/TortillaBuilder/TortillaBuilder';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <TortillaBuilder />
        </Layout>
      </div>
    );
  }
}

//test

export default App;
