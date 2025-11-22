import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { colors } from '../styles/colors';
import { spacing, typography } from '../styles/dimensions';

interface Channel {
  id: string;
  title: string;
  description: string;
  color: string;
  unreadCount?: number;
}

interface ChannelSelectorProps {
  channels: Channel[];
  activeChannel: string;
  onChannelSelect: (channelId: string) => void;
}

export const ChannelSelector: React.FC<ChannelSelectorProps> = ({
  channels,
  activeChannel,
  onChannelSelect,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {channels.map((channel) => (
        <TouchableOpacity
          key={channel.id}
          style={[
            styles.channelCard,
            activeChannel === channel.id && styles.activeChannelCard,
            { borderLeftColor: channel.color }
          ]}
          onPress={() => onChannelSelect(channel.id)}
          activeOpacity={0.7}
        >
          <View style={styles.channelHeader}>
            <Text
              style={[
                styles.channelTitle,
                activeChannel === channel.id && styles.activeChannelTitle,
              ]}
              numberOfLines={1}
            >
              {channel.title}
            </Text>
            {channel.unreadCount && channel.unreadCount > 0 && (
              <View style={[styles.badge, { backgroundColor: channel.color }]}>
                <Text style={styles.badgeText}>
                  {channel.unreadCount > 99 ? '99+' : channel.unreadCount}
                </Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.channelDescription,
              activeChannel === channel.id && styles.activeChannelDescription,
            ]}
            numberOfLines={2}
          >
            {channel.description}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 120,
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  channelCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.md,
    marginRight: spacing.sm,
    minWidth: 160,
    maxWidth: 200,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeChannelCard: {
    backgroundColor: colors.primary[50],
    shadowOpacity: 0.15,
    elevation: 4,
  },
  channelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  channelTitle: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
  },
  activeChannelTitle: {
    color: colors.primary[700],
  },
  channelDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: typography.lineHeights.normal * typography.sizes.sm,
  },
  activeChannelDescription: {
    color: colors.primary[600],
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: '600',
    color: colors.text.inverse,
  },
});