import { Dimensions, Platform, StatusBar } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Safe area per diverse configurazioni
export const DEVICE_WIDTH = screenWidth;
export const DEVICE_HEIGHT = screenHeight;

// Calcolo dinamico delle dimensioni
export const isSmallScreen = screenWidth < 375;
export const isMediumScreen = screenWidth >= 375 && screenWidth < 414;
export const isLargeScreen = screenWidth >= 414;

// Spacing system mobile-optimized
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Touch-friendly sizes
export const touchSizes = {
  small: 36,
  medium: 44,
  large: 56,
  xl: 64,
};

// Typography scale mobile-optimized
export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    display: 32,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
};

// Responsive helpers
export const responsiveWidth = (percentage: number) => {
  return (screenWidth * percentage) / 100;
};

export const responsiveHeight = (percentage: number) => {
  return (screenHeight * percentage) / 100;
};

export const isTablet = () => {
  return screenWidth >= 768;
};

// Status bar height (Android)
export const getStatusBarHeight = () => {
  return Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
};