import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const CustomButton = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled = false,
  variant = 'primary' // 'primary', 'secondary', 'outline'
}) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    disabled && styles.disabledButton,
    style
  ];

  const textStyleArray = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyleArray}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 25,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.primaryDark,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  disabledButton: {
    backgroundColor: Colors.gray,
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontFamily: 'VIPRawyThin',
    textAlign: 'center',
  },
  primaryText: {
    color: Colors.primaryDark,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
  disabledText: {
    color: Colors.white,
  },
});

export default CustomButton; 