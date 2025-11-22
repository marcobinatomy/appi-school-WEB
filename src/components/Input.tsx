import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { colors, borderRadius } from '../styles/colors';
import { spacing, typography, touchSizes } from '../styles/dimensions';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  required = false,
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    textInputProps.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    textInputProps.onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.inputFocused : null,
          error ? styles.inputError : null,
          inputStyle,
        ]}
        placeholderTextColor={colors.text.tertiary}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
      />
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      {helper && !error && (
        <Text style={styles.helperText}>{helper}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  
  label: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  required: {
    color: colors.error[500],
  },
  
  input: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.sizes.md,
    color: colors.text.primary,
    borderWidth: 1.5,
    borderColor: colors.border.light,
    minHeight: touchSizes.medium,
    textAlignVertical: 'center',
  },
  
  inputFocused: {
    borderColor: colors.primary[500],
    backgroundColor: colors.background.primary,
  },
  
  inputError: {
    borderColor: colors.error[500],
    backgroundColor: colors.error[50],
  },
  
  errorText: {
    fontSize: typography.sizes.sm,
    color: colors.error[600],
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  
  helperText: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});