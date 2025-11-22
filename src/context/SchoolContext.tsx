import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SchoolState, SchoolContextType, Message, SchoolType, UserRole, ChannelType } from '../types';
import { useAsyncStorage } from '../hooks/useAsyncStorage';
import { usePushNotifications } from '../hooks/usePushNotifications';

// Mock data iniziale
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Benvenuti al nuovo anno scolastico! Vi ricordiamo che domani iniziano le lezioni.',
    author: 'Dirigente Scolastico',
    role: 'insegnante',
    timestamp: new Date('2024-09-10T09:00:00'),
    channel: 'ufficiale',
  },
  {
    id: '2',
    text: 'Ricordiamo a tutti i genitori che la riunione di classe è fissata per venerdì alle 17:00.',
    author: 'Maestra Elena',
    role: 'insegnante',
    timestamp: new Date('2024-09-12T14:30:00'),
    channel: 'ufficiale',
  },
  {
    id: '3',
    text: 'Ciao a tutti! Qualcuno sa se serve comprare i quaderni speciali per matematica?',
    author: 'Marco Rossi',
    role: 'genitore',
    timestamp: new Date('2024-09-13T08:15:00'),
    channel: 'genitori',
  },
  {
    id: '4',
    text: 'ATTENZIONE: Domani le lezioni sono sospese per maltempo. Restate a casa!',
    author: 'Prof. Bianchi',
    role: 'insegnante',
    timestamp: new Date('2024-09-14T06:45:00'),
    channel: 'urgenti',
  },
  {
    id: '5',
    text: 'Mia figlia Giulia sarà assente domani per visita medica.',
    author: 'Laura Verde',
    role: 'genitore',
    timestamp: new Date('2024-09-15T19:20:00'),
    channel: 'assenze',
  },
];

const initialState: SchoolState = {
  settings: {
    chatGenitoriEnabled: true,
    rappresentanteEnabled: false,
    notificationsEnabled: true,
    darkMode: false,
    hapticFeedback: true,
    sounds: true,
  },
  messages: mockMessages,
  schoolType: undefined,
  userRole: undefined,
  userName: '',
  className: '',
};

type SchoolAction =
  | { type: 'SET_SCHOOL_TYPE'; payload: SchoolType }
  | { type: 'SET_USER_ROLE'; payload: UserRole }
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'SET_CLASS_NAME'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: { channel: ChannelType; message: string } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<SchoolState['settings']> }
  | { type: 'LOAD_STATE'; payload: Partial<SchoolState> };

function schoolReducer(state: SchoolState, action: SchoolAction): SchoolState {
  switch (action.type) {
    case 'SET_SCHOOL_TYPE':
      return { ...state, schoolType: action.payload };
    case 'SET_USER_ROLE':
      return { ...state, userRole: action.payload };
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    case 'SET_CLASS_NAME':
      return { ...state, className: action.payload };
    case 'ADD_MESSAGE':
      const newMessage: Message = {
        id: Date.now().toString(),
        text: action.payload.message,
        author: state.userName || 'Utente',
        role: state.userRole || 'genitore',
        timestamp: new Date(),
        channel: action.payload.channel,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

interface SchoolContextProviderProps {
  children: React.ReactNode;
}

export const SchoolContextProvider: React.FC<SchoolContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(schoolReducer, initialState);
  const [persistentState, setPersistentState] = useAsyncStorage('schoolAppState', initialState);
  const notifications = usePushNotifications();

  // Carica lo stato persistente all'avvio
  useEffect(() => {
    if (persistentState && Object.keys(persistentState).length > 0) {
      // Ricostruisci le date dai timestamp salvati
      const loadedState = {
        ...persistentState,
        messages: persistentState.messages?.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })) || mockMessages,
      };
      dispatch({ type: 'LOAD_STATE', payload: loadedState });
    }
  }, [persistentState]);

  // Salva lo stato quando cambia
  useEffect(() => {
    const stateToSave = {
      ...state,
      messages: state.messages.map((msg: Message) => ({
        ...msg,
        timestamp: msg.timestamp.toISOString(),
      })),
    };
    setPersistentState(stateToSave as any);
  }, [state, setPersistentState]);

  const setSchoolType = (schoolType: SchoolType) => {
    dispatch({ type: 'SET_SCHOOL_TYPE', payload: schoolType });
  };

  const setUserRole = (userRole: UserRole) => {
    dispatch({ type: 'SET_USER_ROLE', payload: userRole });
  };

  const setUserName = (userName: string) => {
    dispatch({ type: 'SET_USER_NAME', payload: userName });
  };

  const setClassName = (className: string) => {
    dispatch({ type: 'SET_CLASS_NAME', payload: className });
  };

  const addMessage = (channel: ChannelType, message: string) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { channel, message } });
    
    // Simula notifica per altri utenti
    if (state.settings.notificationsEnabled) {
      setTimeout(() => {
        notifications.scheduleLocalNotification(
          `💬 Nuovo messaggio in ${channel}`,
          message.substring(0, 50) + (message.length > 50 ? '...' : ''),
          channel,
          1000
        );
      }, 2000);
    }
  };

  const updateSettings = (newSettings: Partial<SchoolState['settings']>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
  };

  const getMessagesForChannel = (channel: ChannelType): any[] => {
    return state.messages
      .filter(msg => msg.channel === channel)
      .map(msg => ({
        message: msg.text,
        sender: msg.author,
        timestamp: msg.timestamp.toISOString(),
      }));
  };

  const getAvailableChannels = (): ChannelType[] => {
    const baseChannels: ChannelType[] = ['ufficiale', 'assenze'];
    
    if (state.userRole === 'genitore' || state.userRole === 'rappresentante') {
      baseChannels.push('genitori');
    }
    
    if (state.userRole === 'insegnante') {
      baseChannels.push('urgenti');
    }
    
    return baseChannels;
  };

  const contextValue: SchoolContextType = {
    state,
    setSchoolType,
    setUserRole,
    setUserName,
    setClassName,
    addMessage,
    updateSettings,
    getMessagesForChannel,
    getAvailableChannels,
    notifications,
  };

  return (
    <SchoolContext.Provider value={contextValue}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = (): SchoolContextType => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchoolContext must be used within a SchoolContextProvider');
  }
  return context;
};