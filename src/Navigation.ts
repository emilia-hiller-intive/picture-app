import { createStackNavigator } from 'react-navigation';
import SearchScreen from './screens/SearchScreen';
import ResultsScreen from './screens/ResultsScreen';

export default createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: 'Search',
        header: null,
      },
    },
    Results: {
      screen: ResultsScreen,
      navigationOptions: {
        // headerLeft: null,
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  },
);
