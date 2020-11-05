import { createStackNavigator } from 'react-navigation';
import SearchScreen from './screens/SearchScreen';
import ResultsScreen from './screens/ResultsScreen';
import { PATHS } from './consts';

export default createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: PATHS.SEARCH,
        header: null,
      },
    },
    Results: {
      screen: ResultsScreen,
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        height: 30,
      },
    },
  },
);
