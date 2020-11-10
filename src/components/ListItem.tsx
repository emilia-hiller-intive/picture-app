import React, { Component, RefObject } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { PATHS } from '../consts';

interface Props extends NavigationInjectedProps {
  thumb?: string;
  description: string;
  onLayout?: (event: any) => void;
  index: number;
  onFocusChange: (index: number) => void;
  ref: RefObject<any>;
}

export interface ListItemType {
  props: Props;
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

  onPress = () => {
    this.onFocus();
    this.props.navigation.navigate(PATHS.VIDEO);
  };

  render() {
    const { thumb, description, onLayout } = this.props;

    return (
      <TouchableHighlight
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        style={[styles.tile, this.state.isFocused ? styles.focused : {}]}
        {...{ onLayout }}
        onPress={this.onPress}
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

export default withNavigation(ListItem);

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
    borderColor: '#37EAEA',
  },
  thumbnail: { width: 80, height: 80 },
};
