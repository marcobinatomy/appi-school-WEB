import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSchoolContext} from '../context/SchoolContext';
import {SchoolType, UserRole} from '../types';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors } from '../styles/colors';
import { spacing, typography, responsiveWidth } from '../styles/dimensions';

const SchoolSetupScreen = () => {
  const {state, setSchoolType, setUserRole, setUserName, setClassName} = useSchoolContext();
  const [localUserName, setLocalUserName] = useState(state.userName || '');
  const [localClassName, setLocalClassName] = useState(state.className || '');

  const schoolTypes: {value: SchoolType; label: string}[] = [
    {value: 'asilo', label: '🏫 Asilo Nido'},
    {value: 'elementari', label: '📚 Scuola Elementare'},
    {value: 'medie', label: '🎓 Scuola Media'},
    {value: 'superiori', label: '🎯 Scuola Superiore'},
  ];

  const userRoles: {value: UserRole; label: string}[] = [
    {value: 'genitore', label: '👨‍👩‍👧‍👦 Genitore'},
    {value: 'insegnante', label: '👨‍🏫 Insegnante'},
    {value: 'rappresentante', label: '🗳️ Rappresentante'},
  ];

  const handleSaveName = () => {
    setUserName(localUserName);
  };

  const handleSaveClass = () => {
    setClassName(localClassName);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Configurazione App Scolastica</Text>
        <Text style={styles.subtitle}>
          Configura il tuo profilo per accedere alle comunicazioni
        </Text>

        {/* Selezione tipo di scuola */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo di Scuola</Text>
          {schoolTypes.map(type => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.option,
                state.schoolType === type.value && styles.selectedOption,
              ]}
              onPress={() => setSchoolType(type.value)}>
              <Text
                style={[
                  styles.optionText,
                  state.schoolType === type.value && styles.selectedOptionText,
                ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selezione ruolo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Il tuo Ruolo</Text>
          {userRoles.map(role => (
            <TouchableOpacity
              key={role.value}
              style={[
                styles.option,
                state.userRole === role.value && styles.selectedOption,
              ]}
              onPress={() => setUserRole(role.value)}>
              <Text
                style={[
                  styles.optionText,
                  state.userRole === role.value && styles.selectedOptionText,
                ]}>
                {role.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nome utente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nome e Cognome</Text>
          <TextInput
            style={styles.input}
            value={localUserName}
            onChangeText={setLocalUserName}
            placeholder="Inserisci il tuo nome e cognome"
            onBlur={handleSaveName}
          />
          {state.userName && (
            <Text style={styles.savedText}>✅ Salvato: {state.userName}</Text>
          )}
        </View>

        {/* Nome classe */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Classe</Text>
          <TextInput
            style={styles.input}
            value={localClassName}
            onChangeText={setLocalClassName}
            placeholder="Es. 3A, Prima Sezione B, etc."
            onBlur={handleSaveClass}
          />
          {state.className && (
            <Text style={styles.savedText}>✅ Salvato: {state.className}</Text>
          )}
        </View>

        {/* Riepilogo configurazione */}
        {state.schoolType && state.userRole && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>📋 Riepilogo Configurazione</Text>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Scuola:</Text> {
                  schoolTypes.find(t => t.value === state.schoolType)?.label
                }
              </Text>
              <Text style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Ruolo:</Text> {
                  userRoles.find(r => r.value === state.userRole)?.label
                }
              </Text>
              {state.userName && (
                <Text style={styles.summaryText}>
                  <Text style={styles.summaryLabel}>Nome:</Text> {state.userName}
                </Text>
              )}
              {state.className && (
                <Text style={styles.summaryText}>
                  <Text style={styles.summaryLabel}>Classe:</Text> {state.className}
                </Text>
              )}
            </View>
          </View>
        )}
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
    marginBottom: 16,
  },
  option: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  selectedOption: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    color: '#374151',
  },
  savedText: {
    fontSize: 14,
    color: '#059669',
    marginTop: 8,
    fontWeight: '500',
  },
  summarySection: {
    marginTop: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  summaryText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  summaryLabel: {
    fontWeight: '600',
  },
});

export default SchoolSetupScreen;