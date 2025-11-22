import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useSchoolContext } from '../context/SchoolContext';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { colors } from '../styles/colors';
import { spacing, typography } from '../styles/dimensions';

const SettingsScreen = () => {
  const { state, updateSettings, notifications } = useSchoolContext();
  const { triggerImpact, triggerNotification } = useHapticFeedback();

  const handleToggle = (key: keyof typeof state.settings, value: boolean) => {
    if (state.settings.hapticFeedback) {
      triggerImpact('light');
    }
    updateSettings({ [key]: value });
  };

  const handleExportData = () => {
    triggerNotification('success');
    Alert.alert(
      'Esporta Dati',
      'I tuoi dati sono stati esportati con successo!',
      [{ text: 'OK', onPress: () => console.log('Export completed') }]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Svuota Cache',
      'Sei sicuro di voler svuotare la cache? Questa azione migliorerà le prestazioni.',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Svuota',
          style: 'destructive',
          onPress: () => {
            triggerNotification('success');
            Alert.alert('Cache Svuotata', 'La cache è stata svuotata con successo.');
          },
        },
      ]
    );
  };

  const handleTestNotifications = () => {
    notifications.simulateSchoolNotifications();
    Alert.alert(
      'Test Notifiche',
      'Verranno inviate alcune notifiche di test nei prossimi secondi.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ Impostazioni</Text>
        <Text style={styles.subtitle}>
          Personalizza la tua esperienza nell'app
        </Text>
      </View>

      {/* Notifiche */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Notifiche</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Notifiche Push</Text>
            <Text style={styles.settingDescription}>
              Ricevi notifiche per nuovi messaggi
            </Text>
          </View>
          <Switch
            value={state.settings.notificationsEnabled}
            onValueChange={(value) => handleToggle('notificationsEnabled', value)}
            trackColor={{ false: colors.gray[300], true: colors.primary[200] }}
            thumbColor={state.settings.notificationsEnabled ? colors.primary[500] : colors.gray[400]}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Suoni</Text>
            <Text style={styles.settingDescription}>
              Riproduci suoni per le notifiche
            </Text>
          </View>
          <Switch
            value={state.settings.sounds}
            onValueChange={(value) => handleToggle('sounds', value)}
            trackColor={{ false: colors.gray[300], true: colors.primary[200] }}
            thumbColor={state.settings.sounds ? colors.primary[500] : colors.gray[400]}
          />
        </View>
      </Card>

      {/* Interfaccia */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Interfaccia</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Modalità Scura</Text>
            <Text style={styles.settingDescription}>
              Interfaccia ottimizzata per condizioni di scarsa luce
            </Text>
          </View>
          <Switch
            value={state.settings.darkMode}
            onValueChange={(value) => handleToggle('darkMode', value)}
            trackColor={{ false: colors.gray[300], true: colors.primary[200] }}
            thumbColor={state.settings.darkMode ? colors.primary[500] : colors.gray[400]}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Feedback Tattile</Text>
            <Text style={styles.settingDescription}>
              Vibrazioni per le interazioni
            </Text>
          </View>
          <Switch
            value={state.settings.hapticFeedback}
            onValueChange={(value) => handleToggle('hapticFeedback', value)}
            trackColor={{ false: colors.gray[300], true: colors.primary[200] }}
            thumbColor={state.settings.hapticFeedback ? colors.primary[500] : colors.gray[400]}
          />
        </View>
      </Card>

      {/* Dati e Privacy */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>🛡️ Dati e Privacy</Text>
        
        <Button
          title="📤 Esporta i Miei Dati"
          onPress={handleExportData}
          variant="outline"
          fullWidth
          style={styles.actionButton}
        />
        
        <Button
          title="� Test Notifiche"
          onPress={handleTestNotifications}
          variant="outline"
          fullWidth
          style={styles.actionButton}
        />
        
        <Button
          title="�🗑️ Svuota Cache"
          onPress={handleClearCache}
          variant="outline"
          fullWidth
          style={styles.actionButton}
        />
      </Card>

      {/* Info App */}
      <Card style={styles.section} variant="filled">
        <Text style={styles.sectionTitle}>ℹ️ Informazioni App</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Versione:</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Build:</Text>
          <Text style={styles.infoValue}>2024.11.001</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Sviluppato per:</Text>
          <Text style={styles.infoValue}>Scuole Italiane</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.sizes.md,
    paddingHorizontal: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingLabel: {
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: typography.lineHeights.normal * typography.sizes.sm,
  },
  actionButton: {
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  infoLabel: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
  },
  infoValue: {
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.text.primary,
  },
});

export default SettingsScreen;