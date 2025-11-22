export type SchoolType = 'asilo' | 'elementari' | 'medie' | 'superiori';

export type UserRole = 'genitore' | 'insegnante' | 'rappresentante';

export type ChannelType = 'ufficiale' | 'genitori' | 'urgenti' | 'assenze' | 'rappresentante';

export interface Message {
  id: string;
  text: string;
  author: string;
  role: UserRole;
  timestamp: Date;
  channel: ChannelType;
}

export interface SchoolSettings {
  chatGenitoriEnabled: boolean;
  rappresentanteEnabled: boolean;
  notificationsEnabled: boolean;
  darkMode: boolean;
  hapticFeedback: boolean;
  sounds: boolean;
}

export interface SchoolState {
  schoolType?: SchoolType;
  userRole?: UserRole;
  userName?: string;
  className?: string;
  messages: Message[];
  settings: SchoolSettings;
}

export interface NotificationHooks {
  permissionGranted: boolean;
  notifications: any[];
  scheduleLocalNotification: (title: string, body: string, channelId?: string, delay?: number) => void;
  clearNotifications: () => void;
  simulateSchoolNotifications: () => void;
  requestPermission: () => Promise<void>;
}

export interface SchoolContextType {
  state: SchoolState;
  setSchoolType: (type: SchoolType) => void;
  setUserRole: (role: UserRole) => void;
  setUserName: (name: string) => void;
  setClassName: (name: string) => void;
  addMessage: (channel: ChannelType, message: string) => void;
  updateSettings: (settings: Partial<SchoolSettings>) => void;
  getMessagesForChannel: (channel: ChannelType) => any[];
  getAvailableChannels: () => ChannelType[];
  notifications: NotificationHooks;
}