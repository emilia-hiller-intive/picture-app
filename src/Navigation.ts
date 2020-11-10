import { createStackNavigator } from 'react-navigation';
import SearchScreen from './screens/SearchScreen';
import ResultsScreen from './screens/ResultsScreen';
import { PATHS } from './consts';
import VideoPlaybackScreen from './screens/VideoPlaybackScreen/VideoPlaybackScreen';

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
    Video: {
      screen: VideoPlaybackScreen,
      navigationOptions: {
        header: null,
      },
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
