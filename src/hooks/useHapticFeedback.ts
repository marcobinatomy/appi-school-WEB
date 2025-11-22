import { Platform } from 'react-native';

// Mock implementation - nella versione reale useremmo react-native-haptic-feedback
const HapticFeedback = {
  impact: (style: 'light' | 'medium' | 'heavy') => {
    if (Platform.OS === 'ios') {
      // iOS: Usa UIImpactFeedbackGenerator
      console.log(`Haptic feedback: ${style} impact`);
    } else if (Platform.OS === 'android') {
      // Android: Usa Vibrator
      console.log(`Vibration: ${style} pattern`);
    }
  },
  selection: () => {
    if (Platform.OS === 'ios') {
      console.log('Haptic feedback: selection');
    }
  },
  notification: (type: 'success' | 'warning' | 'error') => {
    if (Platform.OS === 'ios') {
      console.log(`Haptic feedback: ${type} notification`);
    }
  },
};

export const useHapticFeedback = () => {
  const triggerImpact = (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    HapticFeedback.impact(style);
  };

  const triggerSelection = () => {
    HapticFeedback.selection();
  };

  const triggerNotification = (type: 'success' | 'warning' | 'error') => {
    HapticFeedback.notification(type);
  };

  return {
    triggerImpact,
    triggerSelection,
    triggerNotification,
  };
};