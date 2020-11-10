import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { RootState } from '../store/reducers';
import { PictureType } from '../types/pictures';
import ActivityIndicator from '../components/ActivityIndicator';

interface Props {
  pictures?: PictureType[];
  isPending: boolean;
}

class ResultsScreen extends Component<Props, {}> {
  render() {
    const { pictures, isPending } = this.props;
    return (
      <View style={styles.mainContainer}>
        {isPending && <ActivityIndicator />}
        {pictures && <Grid {...{ pictures }} />}
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isPending: state.searchPictures.isPending,
  isError: state.searchPictures.isSearchError,
  pictures: state.searchPictures.pictures,
});

export default connect(mapStateToProps)(ResultsScreen);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e6e7e7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
