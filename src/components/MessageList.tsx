import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  RefreshControl,
  ViewStyle,
} from 'react-native';
import { Card } from './Card';
import { colors } from '../styles/colors';
import { spacing, typography } from '../styles/dimensions';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: string;
  isOwn?: boolean;
}

interface MessageListProps {
  messages: Message[];
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  onRefresh,
  refreshing = false,
}) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: Date) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Oggi';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Ieri';
    }
    
    return messageDate.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
    });
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const showDateSeparator = index === 0 || 
      formatDate(item.timestamp) !== formatDate(messages[index - 1].timestamp);

    return (
      <View>
        {showDateSeparator && (
          <View style={styles.dateSeparator}>
            <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
          </View>
        )}
        
        <View style={[
          styles.messageContainer,
          item.isOwn ? styles.ownMessageContainer : styles.otherMessageContainer
        ]}>
          <View
            style={[
              styles.messageCard,
              item.isOwn ? styles.ownMessage : styles.otherMessage
            ]}
          >
            {!item.isOwn && (
              <Text style={styles.senderName}>{item.sender}</Text>
            )}
            <Text style={[
              styles.messageText,
              item.isOwn ? styles.ownMessageText : styles.otherMessageText
            ]}>
              {item.text}
            </Text>
            <Text style={[
              styles.timestamp,
              item.isOwn ? styles.ownTimestamp : styles.otherTimestamp
            ]}>
              {formatTime(item.timestamp)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderMessage}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      inverted
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary[500]]}
            tintColor={colors.primary[500]}
          />
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dateText: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    fontWeight: '500',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  messageContainer: {
    marginBottom: spacing.sm,
  },
  ownMessageContainer: {
    alignItems: 'flex-end',
  },
  otherMessageContainer: {
    alignItems: 'flex-start',
  },
  messageCard: {
    maxWidth: '80%',
    minWidth: '30%',
    padding: spacing.md,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ownMessage: {
    backgroundColor: colors.primary[500],
  },
  otherMessage: {
    backgroundColor: colors.background.primary,
  },
  senderName: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  messageText: {
    fontSize: typography.sizes.md,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.md,
    marginBottom: spacing.xs,
  },
  ownMessageText: {
    color: colors.text.inverse,
  },
  otherMessageText: {
    color: colors.text.primary,
  },
  timestamp: {
    fontSize: typography.sizes.xs,
    alignSelf: 'flex-end',
  },
  ownTimestamp: {
    color: colors.primary[100],
  },
  otherTimestamp: {
    color: colors.text.tertiary,
  },
});