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
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>🎓 Configurazione</Text>
        <Text style={styles.subtitle}>
          Imposta il tuo profilo per accedere alle comunicazioni scolastiche
        </Text>
      </View>

      {/* Selezione tipo di scuola */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Tipo di Scuola</Text>
        <View style={styles.optionsContainer}>
          {schoolTypes.map(type => (
            <Card
              key={type.value}
              variant={state.schoolType === type.value ? 'elevated' : 'outlined'}
              onPress={() => setSchoolType(type.value)}
            >
              <View style={[
                state.schoolType === type.value ? styles.selectedOption : null,
              ]}>
                <Text
                  style={[
                    styles.optionText,
                    state.schoolType === type.value ? styles.selectedOptionText : null,
                  ]}>
                  {type.label}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </Card>

      {/* Selezione ruolo */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Il tuo Ruolo</Text>
        <View style={styles.optionsContainer}>
          {userRoles.map(role => (
            <Card
              key={role.value}
              variant={state.userRole === role.value ? 'elevated' : 'outlined'}
              onPress={() => setUserRole(role.value)}
            >
              <View style={[
                state.userRole === role.value ? styles.selectedOption : null,
              ]}>
                <Text
                  style={[
                    styles.optionText,
                    state.userRole === role.value ? styles.selectedOptionText : null,
                  ]}>
                  {role.label}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </Card>

      {/* Nome utente */}
      <Card style={styles.section}>
        <Input
          label="Nome e Cognome"
          value={localUserName}
          onChangeText={setLocalUserName}
          placeholder="Inserisci il tuo nome e cognome"
          onBlur={handleSaveName}
          required
        />
        {state.userName && (
          <Text style={styles.savedText}>✓ Nome salvato</Text>
        )}
      </Card>

      {/* Nome classe */}
      <Card style={styles.section}>
        <Input
          label="Classe/Sezione"
          value={localClassName}
          onChangeText={setLocalClassName}
          placeholder="es. 1A, Sezione Blu, ecc."
          onBlur={handleSaveClass}
        />
        {state.className && (
          <Text style={styles.savedText}>✓ Classe salvata</Text>
        )}
      </Card>

      {/* Riepilogo */}
      {(state.schoolType || state.userRole || state.userName) && (
        <Card style={styles.summarySection} variant="filled">
          <Text style={styles.summaryTitle}>📋 Riepilogo Configurazione</Text>
          {state.schoolType && (
            <Text style={styles.summaryText}>
              <Text style={styles.summaryLabel}>Scuola:</Text>{' '}
              {schoolTypes.find(t => t.value === state.schoolType)?.label}
            </Text>
          )}
          {state.userRole && (
            <Text style={styles.summaryText}>
              <Text style={styles.summaryLabel}>Ruolo:</Text>{' '}
              {userRoles.find(r => r.value === state.userRole)?.label}
            </Text>
          )}
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
        </Card>
      )}
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
  optionsContainer: {
    gap: spacing.sm,
  },
  optionCard: {
    marginBottom: 0,
  },
  selectedOption: {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[500],
  },
  optionText: {
    fontSize: typography.sizes.md,
    color: colors.text.primary,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: colors.primary[600],
    fontWeight: '600',
  },
  savedText: {
    fontSize: typography.sizes.sm,
    color: colors.success[600],
    marginTop: spacing.xs,
    fontWeight: '500',
  },
  summarySection: {
    marginTop: spacing.md,
  },
  summaryTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  summaryText: {
    fontSize: typography.sizes.md,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.md,
  },
  summaryLabel: {
    fontWeight: '600',
    color: colors.text.primary,
  },
});

export default SchoolSetupScreen;