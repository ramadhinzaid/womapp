
import React from 'react';
import {View, TextInput, Text, StyleSheet, TextInputProps} from 'react-native';

interface ValidatedInputProps extends TextInputProps {
  error?: string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  error,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
});

export default ValidatedInput;
