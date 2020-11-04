import React, { Component } from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';

interface Props {
  styles?: TextStyle;
  message: string;
}

class Message extends Component<Props, {}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={this.props.styles}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});

export default Message;
