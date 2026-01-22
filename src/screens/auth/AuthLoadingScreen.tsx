import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const AuthLoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#D4AF37" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default AuthLoadingScreen;
