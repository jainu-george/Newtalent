import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import { Product } from './components/Product/Product';
import { StoreList } from './components/Store/StoreList';
import { Sale } from './components/Sale/Sale';
import { CustomerList } from './components/customer/CustomerList';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/product' component={Product} />
        <Route path='/customer' component={CustomerList} />
        <Route path='/store' component={StoreList} />
        <Route path='/sale' component={Sale} />
      </Layout>
    );
  }
}
