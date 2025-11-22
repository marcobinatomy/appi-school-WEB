import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { colors, shadows, borderRadius } from '../styles/colors';
import { spacing } from '../styles/dimensions';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  accessible?: boolean;
  accessibilityLabel?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'elevated',
  padding = 'medium',
  style,
  accessible = true,
  accessibilityLabel,
}) => {
  const getPaddingStyle = () => {
    switch (padding) {
      case 'none': return styles.paddingNone;
      case 'small': return styles.paddingSmall;
      case 'medium': return styles.paddingMedium;
      case 'large': return styles.paddingLarge;
      default: return styles.paddingMedium;
    }
  };

  const cardStyles = [
    styles.base,
    styles[variant],
    getPaddingStyle(),
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.95}
        accessible={accessible}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
      >
        {children}
      </TouchableOpacity>
    );
  }
  
  return (
    <View
      style={cardStyles}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  
  elevated: {
    backgroundColor: colors.background.primary,
    ...shadows.md,
  },
  
  outlined: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  
  filled: {
    backgroundColor: colors.background.secondary,
  },
  
  paddingNone: {
    padding: 0,
  },
  
  paddingSmall: {
    padding: spacing.sm,
  },
  
  paddingMedium: {
    padding: spacing.md,
  },
  
  paddingLarge: {
    padding: spacing.lg,
  },
});