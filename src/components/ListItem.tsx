import React, { Component, RefObject } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';

interface Props {
  thumb?: string;
  description: string;
  onPress?: () => void;
  ref: RefObject<ListItem>;
}

class ListItem extends Component<Props, {}> {
  state = { isFocused: false };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const { thumb, description } = this.props;

    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        style={[styles.button, this.state.isFocused ? styles.focused : {}]}
      >
        <View>
          <View>
            <Image style={styles.thumbnail} source={{ uri: thumb }} />
          </View>
          <View>
            <Text>{description}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ListItem;

const styles = {
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  text: {
    fontSize: 12,
    color: 'red',
  },
  focused: {
    borderColor: '#E71C32',
  },
  thumbnail: { width: 60, height: 60 },
};
