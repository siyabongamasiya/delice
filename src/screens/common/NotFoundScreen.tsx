import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotFoundScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>404 - Not Found</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default NotFoundScreen;
