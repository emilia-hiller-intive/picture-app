import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RootStack from './Navigation';
import initStore from './store';

export default class YiReactApp extends Component {
  render() {
    return (
      <Provider store={initStore()}>
        <RootStack />
      </Provider>
    );
  }
}
