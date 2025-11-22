import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSchoolContext} from '../context/SchoolContext';
import {ChannelType} from '../types';
import { MessageList } from '../components/MessageList';
import { ChannelSelector } from '../components/ChannelSelector';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors } from '../styles/colors';
import { spacing } from '../styles/dimensions';

const CommunicationScreen = () => {
  const {
    state,
    getMessagesForChannel,
    getAvailableChannels,
    addMessage,
  } = useSchoolContext();
  
  const [activeChannel, setActiveChannel] = useState<ChannelType>('ufficiale');
  const [messageText, setMessageText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const channels = getAvailableChannels();
  const messages = getMessagesForChannel(activeChannel);

  const channelInfo = {
    ufficiale: {
      title: '📢 Ufficiale',
      description: 'Comunicazioni istituzionali',
      color: colors.primary[500],
      canWrite: state.userRole === 'insegnante',
    },
    genitori: {
      title: '💬 Genitori',
      description: 'Chat tra genitori',
      color: colors.success[500],
      canWrite: state.userRole === 'genitore' || state.userRole === 'rappresentante',
    },
    urgenti: {
      title: '🚨 Urgenti',
      description: 'Comunicazioni urgenti',
      color: colors.error[500],
      canWrite: state.userRole === 'insegnante',
    },
    assenze: {
      title: '📋 Assenze',
      description: 'Gestione assenze',
      color: colors.warning[500],
      canWrite: true,
    },
  };

  const channelsData = channels.map(channel => ({
    id: channel,
    title: channelInfo[channel].title,
    description: channelInfo[channel].description,
    color: channelInfo[channel].color,
    unreadCount: Math.floor(Math.random() * 5), // Mock unread count
  }));

  const currentChannelInfo = channelInfo[activeChannel];
  const canWrite = currentChannelInfo?.canWrite || false;

  const handleSendMessage = () => {
    if (messageText.trim() && canWrite) {
      addMessage(activeChannel, messageText.trim());
      setMessageText('');
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const formatMessages = (msgs: any[]) => {
    return msgs.map((msg, index) => ({
      id: `${msg.timestamp}-${index}`,
      text: msg.message,
      timestamp: new Date(msg.timestamp),
      sender: msg.sender,
      isOwn: msg.sender === state.userName,
    }));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.channelSelectorContainer}>
        <ChannelSelector
          channels={channelsData}
          activeChannel={activeChannel}
          onChannelSelect={(channelId) => setActiveChannel(channelId as ChannelType)}
        />
      </View>

      <View style={styles.messagesContainer}>
        <MessageList
          messages={formatMessages(messages)}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </View>

      {canWrite && (
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Input
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Scrivi un messaggio..."
              containerStyle={styles.messageInput}
              multiline
              maxLength={500}
            />
            <Button
              title="📤"
              onPress={handleSendMessage}
              disabled={!messageText.trim()}
              size="medium"
              style={styles.sendButton}
            />
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  channelSelectorContainer: {
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    padding: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  messageInput: {
    flex: 1,
    marginBottom: 0,
  },
  sendButton: {
    marginBottom: spacing.md,
    aspectRatio: 1,
    borderRadius: 24,
  },
});

export default CommunicationScreen;