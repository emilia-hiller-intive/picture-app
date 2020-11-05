import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { FocusManager } from '@youi/react-native-youi';
import actions from '../store/actions';
import { RootState } from '../store/reducers';
import ActivityIndicator from '../components/ActivityIndicator';
import Message from '../components/Message';
import { PicturesStateType } from '../store/reducers/searchPictures/searchPicturesReducer';

interface State {
  inputValue: string;
}

interface Props extends PicturesStateType {
  dispatch: Dispatch;
  navigation: NavigationScreenProp<NavigationState>;
}

class SearchScreen extends Component<Props, State> {
  inputRef = createRef<TextInput>();

  state = {
    inputValue: '',
  };

  onLayout = () => {
    FocusManager.enableFocus(this?.inputRef?.current);
    FocusManager.focus(this?.inputRef?.current);
  };

  handleChange = (inputValue: string) => {
    this.setState({
      inputValue,
    });
  };

  handleSearch = () => {
    if (this.state.inputValue) {
      this.props.dispatch(
        actions.searchPicturesSaga.searchPictures(this.state.inputValue),
      );
      this.setState({ inputValue: '' });
    }
  };

  render() {
    const {
      state: { inputValue },
    } = this;
    const {
      props: { isPending, isSearchError, pictures },
    } = this;

    return (
      <>
        {isPending && !isSearchError ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.mainContainer}>
            <View style={styles.search}>
              <TextInput
                ref={this.inputRef}
                style={styles.input}
                onChangeText={this.handleChange}
                value={inputValue}
                placeholder="Search..."
                placeholderTextColor="#A3A4A4"
                onLayout={this.onLayout}
              />
              <TouchableOpacity
                disabled={!inputValue}
                onPress={this.handleSearch}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{'>'}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {isSearchError && (
              <Message
                styles={styles.error}
                message="There has been an error. Try again."
              />
            )}
            {pictures?.length === 0 && <Message message="No pictures found." />}
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isPending: state.searchPictures.isPending,
  isSearchError: state.searchPictures.isSearchError,
  pictures: state.searchPictures.pictures,
});

export default connect(mapStateToProps)(SearchScreen);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e6e7e7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
  },
  error: {
    color: '#A94E4E',
  },
  input: { height: 40, maxWidth: '80%', borderWidth: 2 },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    height: 40,
    width: 40,
    backgroundColor: '#37EAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
