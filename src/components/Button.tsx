import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, shadows, borderRadius } from '../styles/colors';
import { touchSizes, spacing, typography } from '../styles/dimensions';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.text.inverse : colors.primary[500]}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...shadows.sm,
  },
  
  // Variants
  primary: {
    backgroundColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: colors.gray[100],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // Sizes - touch-friendly
  small: {
    height: touchSizes.small,
    paddingHorizontal: spacing.md,
  },
  medium: {
    height: touchSizes.medium,
    paddingHorizontal: spacing.lg,
  },
  large: {
    height: touchSizes.large,
    paddingHorizontal: spacing.xl,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  disabled: {
    backgroundColor: colors.gray[200],
    shadowOpacity: 0,
    elevation: 0,
  },
  
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  
  primaryText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.md,
  },
  secondaryText: {
    color: colors.text.primary,
    fontSize: typography.sizes.md,
  },
  outlineText: {
    color: colors.primary[500],
    fontSize: typography.sizes.md,
  },
  ghostText: {
    color: colors.primary[500],
    fontSize: typography.sizes.md,
  },
  
  smallText: {
    fontSize: typography.sizes.sm,
  },
  mediumText: {
    fontSize: typography.sizes.md,
  },
  largeText: {
    fontSize: typography.sizes.lg,
  },
  
  disabledText: {
    color: colors.text.disabled,
  },
});