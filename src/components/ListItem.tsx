import React, { Component, RefObject } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';

interface Props {
  thumb?: string;
  description: string;
  onLayout?: (event: any) => void;
  index: number;
  onFocusChange: (index: number) => void;
}

class ListItem extends Component<Props, {}> {
  state = { isFocused: false };

  onFocus = () => {
    const { index, onFocusChange } = this.props;

    onFocusChange(index);
    this.setState({ isFocused: true });
  };

  onBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const { thumb, description, onLayout } = this.props;

    return (
      <TouchableHighlight
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        style={[styles.tile, this.state.isFocused ? styles.focused : {}]}
        {...{ onLayout }}
      >
        {/* @ts-ignore */}
        <View style={styles.content}>
          <View>
            <Image style={styles.thumbnail} source={{ uri: thumb }} />
          </View>
          <View>
            <Text style={styles.text} numberOfLines={5}>
              {description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ListItem;

const styles = {
  tile: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F1F1F1',
    width: '21%',
    height: 150,
  },
  content: { flexDirection: 'column' },
  text: {
    fontSize: 8,
  },
  focused: {
    borderColor: '#E71C32',
  },
  thumbnail: { width: 80, height: 80 },
};
