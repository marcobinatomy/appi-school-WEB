import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {useSchoolContext} from '../context/SchoolContext';
import {UserRole} from '../types';

const SettingsScreen = () => {
  const {
    state,
    toggleChatGenitori,
    toggleRappresentante,
    setUserRole,
  } = useSchoolContext();

  const roleOptions: {value: UserRole; label: string; description: string}[] = [
    {
      value: 'genitore',
      label: '👨‍👩‍👧‍👦 Genitore',
      description: 'Accedi come genitore per chattare e ricevere comunicazioni',
    },
    {
      value: 'insegnante',
      label: '👨‍🏫 Insegnante',
      description: 'Accedi come insegnante per inviare comunicazioni ufficiali',
    },
    {
      value: 'rappresentante',
      label: '🗳️ Rappresentante di Classe',
      description: 'Accedi come rappresentante con privilegi aggiuntivi',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>⚙️ Impostazioni App</Text>
        <Text style={styles.subtitle}>
          Personalizza la tua esperienza e testa diverse funzionalità
        </Text>

        {/* Sezione cambio ruolo per demo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎭 Cambia Ruolo (Demo)</Text>
          <Text style={styles.sectionDescription}>
            Cambia il tuo ruolo per testare le diverse visualizzazioni dell'app
          </Text>
          {roleOptions.map(role => (
            <TouchableOpacity
              key={role.value}
              style={[
                styles.roleOption,
                state.userRole === role.value && styles.selectedRoleOption,
              ]}
              onPress={() => setUserRole(role.value)}>
              <View style={styles.roleContent}>
                <Text
                  style={[
                    styles.roleLabel,
                    state.userRole === role.value && styles.selectedRoleLabel,
                  ]}>
                  {role.label}
                </Text>
                <Text style={styles.roleDescription}>{role.description}</Text>
              </View>
              <View
                style={[
                  styles.roleIndicator,
                  state.userRole === role.value && styles.selectedRoleIndicator,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sezione configurazione canali */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📺 Configurazione Canali</Text>
          <Text style={styles.sectionDescription}>
            Abilita o disabilita i canali di comunicazione
          </Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>💬 Chat Genitori</Text>
              <Text style={styles.settingDescription}>
                Abilita la chat aperta tra tutti i genitori della classe
              </Text>
            </View>
            <Switch
              value={state.settings.chatGenitoriEnabled}
              onValueChange={toggleChatGenitori}
              thumbColor={state.settings.chatGenitoriEnabled ? '#10b981' : '#f3f4f6'}
              trackColor={{false: '#d1d5db', true: '#10b981'}}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>🗳️ Canale Rappresentante</Text>
              <Text style={styles.settingDescription}>
                Abilita le comunicazioni del rappresentante di classe
              </Text>
            </View>
            <Switch
              value={state.settings.rappresentanteEnabled}
              onValueChange={toggleRappresentante}
              thumbColor={state.settings.rappresentanteEnabled ? '#8b5cf6' : '#f3f4f6'}
              trackColor={{false: '#d1d5db', true: '#8b5cf6'}}
            />
          </View>
        </View>

        {/* Sezione informazioni correnti */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Configurazione Attuale</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tipo Scuola:</Text>
              <Text style={styles.infoValue}>
                {state.schoolType ? state.schoolType.charAt(0).toUpperCase() + state.schoolType.slice(1) : 'Non configurata'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ruolo:</Text>
              <Text style={styles.infoValue}>
                {state.userRole ? state.userRole.charAt(0).toUpperCase() + state.userRole.slice(1) : 'Non configurato'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nome:</Text>
              <Text style={styles.infoValue}>
                {state.userName || 'Non configurato'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Classe:</Text>
              <Text style={styles.infoValue}>
                {state.className || 'Non configurata'}
              </Text>
            </View>
          </View>
        </View>

        {/* Sezione informazioni app */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ Informazioni</Text>
          <View style={styles.infoCard}>
            <Text style={styles.appTitle}>Sistema di Comunicazione Scolastica</Text>
            <Text style={styles.appDescription}>
              Applicazione demo per la comunicazione multi-canale tra scuola e famiglie.
            </Text>
            <Text style={styles.appFeatures}>
              ✅ Comunicazioni ufficiali{'\n'}
              ✅ Chat tra genitori{'\n'}
              ✅ Messaggi urgenti{'\n'}
              ✅ Gestione assenze{'\n'}
              ✅ Canale rappresentante{'\n'}
              ✅ Configurazione personalizzabile
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  roleOption: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedRoleOption: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  roleContent: {
    flex: 1,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  selectedRoleLabel: {
    color: '#3b82f6',
  },
  roleDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  roleIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e5e7eb',
    marginLeft: 12,
  },
  selectedRoleIndicator: {
    backgroundColor: '#3b82f6',
  },
  settingItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  infoValue: {
    fontSize: 14,
    color: '#6b7280',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  appFeatures: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

export default SettingsScreen;