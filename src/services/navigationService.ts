import {
  NavigationActions,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface ConfigType {
  navigator: NavigationScreenProp<NavigationState>;
}

const config = {} as ConfigType;

export default class NavigationService {
  static setNavigator(nav: NavigationScreenProp<NavigationState>): void {
    if (nav) {
      config.navigator = nav;
    }
  }

  static navigate(routeName: string): void {
    if (config?.navigator && routeName) {
      const action = NavigationActions.navigate({ routeName });
      config?.navigator?.dispatch(action);
    }
  }

  static goBack(): void {
    if (config?.navigator) {
      const action = NavigationActions.back({});
      config?.navigator?.dispatch(action);
    }
  }
}
