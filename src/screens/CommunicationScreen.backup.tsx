import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {useSchoolContext} from '../context/SchoolContext';
import {ChannelType, Message} from '../types';

const CommunicationScreen = () => {
  const {
    state,
    getMessagesForChannel,
    getAvailableChannels,
    addMessage,
  } = useSchoolContext();
  
  const [activeChannel, setActiveChannel] = useState<ChannelType>('ufficiale');
  const [messageText, setMessageText] = useState('');

  const channels = getAvailableChannels();
  const messages = getMessagesForChannel(activeChannel);

  const channelInfo = {
    ufficiale: {
      title: '📢 Canale Ufficiale',
      description: 'Comunicazioni istituzionali dalla scuola',
      color: '#3b82f6',
      canWrite: state.userRole === 'insegnante',
    },
    genitori: {
      title: '💬 Chat Genitori',
      description: 'Chat aperta tra tutti i genitori della classe',
      color: '#10b981',
      canWrite: state.userRole === 'genitore' || state.userRole === 'rappresentante',
    },
    urgenti: {
      title: '🚨 Comunicazioni Urgenti',
      description: 'Comunicazioni urgenti dagli insegnanti',
      color: '#ef4444',
      canWrite: state.userRole === 'insegnante',
    },
    assenze: {
      title: '📋 Gestione Assenze',
      description: 'Comunicazioni di assenze e giustificazioni',
      color: '#f59e0b',
      canWrite: true,
    },
    rappresentante: {
      title: '🗳️ Canale Rappresentante',
      description: 'Comunicazioni del rappresentante di classe',
      color: '#8b5cf6',
      canWrite: state.userRole === 'rappresentante',
    },
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !state.userName) {
      return;
    }

    addMessage({
      text: messageText.trim(),
      author: state.userName,
      role: state.userRole!,
      channel: activeChannel,
    });

    setMessageText('');
  };

  const canAccessChannel = (channel: ChannelType) => {
    if (!state.schoolType || !state.userRole) {
      return false;
    }
    return channels.includes(channel);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMessage = ({item}: {item: Message}) => (
    <View style={[styles.message, item.role === 'insegnante' && styles.teacherMessage]}>
      <View style={styles.messageHeader}>
        <Text style={styles.messageAuthor}>
          {item.role === 'insegnante' ? '👨‍🏫' : item.role === 'rappresentante' ? '🗳️' : '👤'} {item.author}
        </Text>
        <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
      </View>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  if (!state.schoolType || !state.userRole) {
    return (
      <View style={styles.setupContainer}>
        <Text style={styles.setupTitle}>⚙️ Configurazione Richiesta</Text>
        <Text style={styles.setupText}>
          Prima di accedere alle comunicazioni, completa la configurazione nella scheda Setup.
        </Text>
        <Text style={styles.setupSubtext}>
          Dovrai selezionare il tipo di scuola, il tuo ruolo e inserire i tuoi dati.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Tabs per i canali */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {channels.map(channel => (
          <TouchableOpacity
            key={channel}
            style={[
              styles.tab,
              activeChannel === channel && styles.activeTab,
              {borderBottomColor: channelInfo[channel].color},
            ]}
            onPress={() => setActiveChannel(channel)}>
            <Text
              style={[
                styles.tabText,
                activeChannel === channel && {color: channelInfo[channel].color},
              ]}>
              {channelInfo[channel].title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Header del canale attivo */}
      <View style={[styles.channelHeader, {backgroundColor: channelInfo[activeChannel].color + '15'}]}>
        <Text style={[styles.channelTitle, {color: channelInfo[activeChannel].color}]}>
          {channelInfo[activeChannel].title}
        </Text>
        <Text style={styles.channelDescription}>
          {channelInfo[activeChannel].description}
        </Text>
      </View>

      {/* Lista messaggi */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nessun messaggio in questo canale</Text>
            <Text style={styles.emptySubtext}>
              {channelInfo[activeChannel].canWrite 
                ? 'Scrivi il primo messaggio!' 
                : 'I messaggi verranno visualizzati qui quando disponibili'}
            </Text>
          </View>
        )}
      />

      {/* Input per inviare messaggi */}
      {channelInfo[activeChannel].canWrite && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            value={messageText}
            onChangeText={setMessageText}
            placeholder={`Scrivi un messaggio per ${channelInfo[activeChannel].title}...`}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {backgroundColor: channelInfo[activeChannel].color},
              !messageText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!messageText.trim()}>
            <Text style={styles.sendButtonText}>Invia</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  setupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  setupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  setupText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  setupSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  tabsContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  channelHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  channelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  channelDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
  },
  message: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  teacherMessage: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  messageTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  messageText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#9ca3af',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
    color: '#374151',
  },
  sendButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default CommunicationScreen;