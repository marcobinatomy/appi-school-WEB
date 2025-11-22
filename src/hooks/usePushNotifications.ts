import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';

interface NotificationData {
  id: string;
  title: string;
  body: string;
  channelId?: string;
  timestamp: number;
}

// Mock implementation - nella versione reale useremmo @react-native-firebase/messaging o react-native-push-notification
export const usePushNotifications = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    // Simulazione richiesta permessi
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      // In una app reale, qui chiederemmo i permessi per le notifiche
      if (Platform.OS === 'ios') {
        // iOS: UNUserNotificationCenter
        console.log('Requesting iOS notification permission');
      } else {
        // Android: Firebase Messaging
        console.log('Requesting Android notification permission');
      }
      
      // Simuliamo la concessione del permesso
      setPermissionGranted(true);
    } catch (error) {
      console.warn('Permission request failed:', error);
      setPermissionGranted(false);
    }
  };

  const scheduleLocalNotification = (
    title: string,
    body: string,
    channelId?: string,
    delay: number = 0
  ) => {
    if (!permissionGranted) {
      Alert.alert(
        'Permessi Richiesti',
        'Attiva le notifiche nelle impostazioni per ricevere aggiornamenti.'
      );
      return;
    }

    const notification: NotificationData = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      body,
      channelId,
      timestamp: Date.now() + delay,
    };

    if (delay > 0) {
      setTimeout(() => {
        showNotification(notification);
      }, delay);
    } else {
      showNotification(notification);
    }
  };

  const showNotification = (notification: NotificationData) => {
    setNotifications(prev => [notification, ...prev]);
    
    // Simulazione notifica nativa
    Alert.alert(
      notification.title,
      notification.body,
      [
        { text: 'Chiudi', style: 'cancel' },
        { text: 'Apri', onPress: () => handleNotificationPress(notification) },
      ]
    );
  };

  const handleNotificationPress = (notification: NotificationData) => {
    console.log('Notification pressed:', notification);
    // Qui navigheremmo alla schermata appropriata
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const simulateSchoolNotifications = () => {
    const schoolNotifications = [
      {
        title: '📢 Comunicazione Scuola',
        body: 'Nuova comunicazione dalla segreteria disponibile',
        channelId: 'ufficiale',
      },
      {
        title: '💬 Nuovo Messaggio',
        body: 'Hai ricevuto un nuovo messaggio nella chat genitori',
        channelId: 'genitori',
      },
      {
        title: '🚨 Comunicazione Urgente',
        body: 'Attenzione: cambio orario per domani',
        channelId: 'urgenti',
      },
      {
        title: '📅 Promemoria',
        body: 'Ricorda di giustificare l\'assenza di ieri',
        channelId: 'assenze',
      },
    ];

    schoolNotifications.forEach((notif, index) => {
      scheduleLocalNotification(
        notif.title,
        notif.body,
        notif.channelId,
        index * 2000 // Spacing di 2 secondi tra le notifiche
      );
    });
  };

  return {
    permissionGranted,
    notifications,
    scheduleLocalNotification,
    clearNotifications,
    simulateSchoolNotifications,
    requestPermission,
  };
};