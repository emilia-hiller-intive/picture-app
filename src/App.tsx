import React, { Component, createRef } from 'react';
import { Provider } from 'react-redux';
import RootStack from './Navigation';
import initStore from './store';
import NavigationService from './services/navigationService';

export default class YiReactApp extends Component {
  navigator = null;

  componentDidMount() {
    // @ts-ignore
    NavigationService.setNavigator(this.navigator);
  }

  render() {
    return (
      <Provider store={initStore()}>
        <RootStack
          ref={(nav) => {
            // @ts-ignore
            this.navigator = nav;
          }}
        />
      </Provider>
    );
  }
}
