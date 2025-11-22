import React from 'react';
import {SchoolState, SchoolContextType, Message, SchoolType, UserRole, ChannelType} from '../types';

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
    rappresentanteEnabled: true,
  },
};

const SchoolContext = React.createContext<SchoolContextType | undefined>(undefined);

export function SchoolContextProvider({children}: {children: React.ReactNode}) {
  const [schoolType, setSchoolTypeState] = React.useState<SchoolType | undefined>(undefined);
  const [userRole, setUserRoleState] = React.useState<UserRole | undefined>(undefined);
  const [userName, setUserNameState] = React.useState<string | undefined>(undefined);
  const [className, setClassNameState] = React.useState<string | undefined>(undefined);
  const [chatGenitoriEnabled, setChatGenitoriEnabled] = React.useState(true);
  const [rappresentanteEnabled, setRappresentanteEnabled] = React.useState(true);
  const [messages, setMessages] = React.useState<Message[]>(mockMessages);

  const state: SchoolState = {
    schoolType,
    userRole,
    userName,
    className,
    settings: {
      chatGenitoriEnabled,
      rappresentanteEnabled,
    },
  };

  const setSchoolType = (type: SchoolType) => {
    setSchoolTypeState(type);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
  };

  const setClassName = (name: string) => {
    setClassNameState(name);
  };

  const toggleChatGenitori = () => {
    setChatGenitoriEnabled(prev => !prev);
  };

  const toggleRappresentante = () => {
    setRappresentanteEnabled(prev => !prev);
  };

  const addMessage = (messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getMessagesForChannel = (channel: ChannelType): Message[] => {
    return messages
      .filter(msg => msg.channel === channel)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const getAvailableChannels = (): ChannelType[] => {
    const baseChannels: ChannelType[] = ['ufficiale', 'urgenti', 'assenze'];
    
    if (chatGenitoriEnabled) {
      baseChannels.push('genitori');
    }
    
    if (rappresentanteEnabled) {
      baseChannels.push('rappresentante');
    }
    
    return baseChannels;
  };

  const contextValue: SchoolContextType = {
    state,
    setSchoolType,
    setUserRole,
    setUserName,
    setClassName,
    toggleChatGenitori,
    toggleRappresentante,
    addMessage,
    getMessagesForChannel,
    getAvailableChannels,
  };

  return (
    <SchoolContext.Provider value={contextValue}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchoolContext() {
  const context = React.useContext(SchoolContext);
  if (context === undefined) {
    throw new Error('useSchoolContext must be used within a SchoolContextProvider');
  }
  return context;
}