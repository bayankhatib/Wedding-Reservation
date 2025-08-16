import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  style,
  containerStyle,
  error,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.errorInput,
          style
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16, 
    fontFamily: 'VIPRawyThin',
    color: Colors.white,
    marginBottom: 2,
    textAlign: 'right',
    lineHeight: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'VIPRawyThin',
    backgroundColor: '#fffef7',
    color: Colors.textPrimary,
    textAlign: 'right',
    lineHeight: 24, 
  },
  multilineInput: {
    minHeight: 100,
    paddingTop: 12,
  },
  errorInput: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    marginTop: 4,
    textAlign: 'right',
  },
});

export default CustomInput; 