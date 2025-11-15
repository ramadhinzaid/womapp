import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default ErrorState;
