import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SignupScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Signup</Text>
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

export default SignupScreen;
