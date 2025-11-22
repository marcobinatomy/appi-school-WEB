import { useState, useEffect } from 'react';

// Mock storage per React Native
const mockStorage = new Map<string, string>();

// Mock implementation - nella versione reale useremmo @react-native-async-storage/async-storage
const AsyncStorage = {
  getItem: async (key: string): Promise<string | null> => {
    return mockStorage.get(key) || null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    mockStorage.set(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    mockStorage.delete(key);
  },
  getAllKeys: async (): Promise<string[]> => {
    return Array.from(mockStorage.keys());
  },
};

export const useAsyncStorage = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => Promise<void>, boolean] => {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(`Error loading ${key} from storage:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredValue();
  }, [key]);

  const setValue = async (value: T) => {
    try {
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error saving ${key} to storage:`, error);
    }
  };

  return [storedValue, setValue, loading];
};

export const useOfflineStorage = () => {
  const clearAll = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await Promise.all(keys.map(key => AsyncStorage.removeItem(key)));
    } catch (error) {
      console.warn('Error clearing storage:', error);
    }
  };

  const getStorageSize = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += new Blob([value]).size;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.warn('Error calculating storage size:', error);
      return 0;
    }
  };

  return {
    clearAll,
    getStorageSize,
  };
};