import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ActivityIndicator extends Component<{}, {}> {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37EAEA',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loading: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ActivityIndicator;
