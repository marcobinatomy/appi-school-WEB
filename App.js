import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

const SchoolApp = () => {
  const [currentTab, setCurrentTab] = React.useState('setup');
  const [schoolType, setSchoolType] = React.useState('');
  const [userRole, setUserRole] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [className, setClassName] = React.useState('');
  const [activeChannel, setActiveChannel] = React.useState('ufficiale');
  const [messageText, setMessageText] = React.useState('');
  const [messages, setMessages] = React.useState([
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
      text: 'Ciao a tutti! Qualcuno sa se serve comprare i quaderni speciali per matematica?',
      author: 'Marco Rossi',
      role: 'genitore',
      timestamp: new Date('2024-09-13T08:15:00'),
      channel: 'genitori',
    },
    {
      id: '3',
      text: 'ATTENZIONE: Domani le lezioni sono sospese per maltempo.',
      author: 'Prof. Bianchi',
      role: 'insegnante',
      timestamp: new Date('2024-09-14T06:45:00'),
      channel: 'urgenti',
    },
  ]);

  const schoolTypes = [
    { value: 'asilo', label: '🍼 Asilo Nido', description: 'Bambini 0-3 anni' },
    { value: 'elementari', label: '📚 Scuola Elementare', description: 'Bambini 6-11 anni' },
    { value: 'medie', label: '🎓 Scuola Media', description: 'Ragazzi 11-14 anni' },
    { value: 'superiori', label: '🎯 Scuola Superiore', description: 'Ragazzi 14-19 anni' },
  ];

  const userRoles = [
    { value: 'genitore', label: '👨‍👩‍👧‍👦 Genitore', description: 'Ricevi comunicazioni e chatta' },
    { value: 'insegnante', label: '👨‍🏫 Insegnante', description: 'Invia comunicazioni ufficiali' },
    { value: 'rappresentante', label: '🗳️ Rappresentante', description: 'Privilegi aggiuntivi' },
  ];

  const channels = [
    { id: 'ufficiale', title: '📢 Ufficiale', color: '#3b82f6' },
    { id: 'genitori', title: '💬 Chat Genitori', color: '#10b981' },
    { id: 'urgenti', title: '🚨 Urgenti', color: '#ef4444' },
    { id: 'assenze', title: '📋 Assenze', color: '#f59e0b' },
  ];

  const handleSendMessage = () => {
    if (!messageText.trim() || !userName) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: messageText.trim(),
      author: userName,
      role: userRole,
      timestamp: new Date(),
      channel: activeChannel,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageText('');
  };

  const getMessagesForChannel = (channel) => {
    return messages.filter(msg => msg.channel === channel);
  };

  const isSetupComplete = () => {
    return schoolType && userRole && userName && className;
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSaveSetup = () => {
    if (isSetupComplete()) {
      Alert.alert('Configurazione Salvata! ✅', `Benvenuto/a ${userName}!`);
    } else {
      Alert.alert('Errore', 'Completa tutti i campi');
    }
  };

  const renderSetupScreen = () => (
    <ScrollView style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>🏫 Configurazione Scuola</Text>
        <Text style={styles.subtitle}>Configura il tipo di scuola e il tuo ruolo</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Tipo di Scuola</Text>
        {schoolTypes.map(school => (
          <TouchableOpacity
            key={school.value}
            style={[styles.option, schoolType === school.value && styles.selectedOption]}
            onPress={() => setSchoolType(school.value)}>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>{school.label}</Text>
              <Text style={styles.optionDescription}>{school.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Ruolo Utente</Text>
        {userRoles.map(role => (
          <TouchableOpacity
            key={role.value}
            style={[styles.option, userRole === role.value && styles.selectedOption]}
            onPress={() => setUserRole(role.value)}>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>{role.label}</Text>
              <Text style={styles.optionDescription}>{role.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✏️ Dati Personali</Text>
        <TextInput
          style={styles.textInput}
          value={userName}
          onChangeText={setUserName}
          placeholder="Nome e Cognome"
        />
        <TextInput
          style={styles.textInput}
          value={className}
          onChangeText={setClassName}
          placeholder="Nome Classe (es: 1A, III D)"
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isSetupComplete() && styles.saveButtonActive]}
        onPress={handleSaveSetup}>
        <Text style={[styles.saveButtonText, isSetupComplete() && styles.saveButtonTextActive]}>
          {isSetupComplete() ? '✅ Salva Configurazione' : '⚠️ Completa tutti i campi'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderCommunicationScreen = () => (
    <View style={styles.communicationContainer}>
      {!isSetupComplete() ? (
        <View style={styles.setupRequired}>
          <Text style={styles.setupRequiredTitle}>⚙️ Configurazione Richiesta</Text>
          <Text style={styles.setupRequiredText}>
            Completa la configurazione nella scheda Setup per accedere alle comunicazioni.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView horizontal style={styles.tabsContainer}>
            {channels.map(channel => (
              <TouchableOpacity
                key={channel.id}
                style={[
                  styles.tab,
                  activeChannel === channel.id && styles.activeTab,
                  { borderBottomColor: channel.color }
                ]}
                onPress={() => setActiveChannel(channel.id)}>
                <Text style={[styles.tabText, activeChannel === channel.id && { color: channel.color }]}>
                  {channel.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView style={styles.messagesList}>
            {getMessagesForChannel(activeChannel).map(message => (
              <View key={message.id} style={styles.message}>
                <View style={styles.messageHeader}>
                  <Text style={styles.messageAuthor}>
                    {message.role === 'insegnante' ? '👨‍🏫' : '👤'} {message.author}
                  </Text>
                  <Text style={styles.messageTime}>{formatTime(message.timestamp)}</Text>
                </View>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              value={messageText}
              onChangeText={setMessageText}
              placeholder={`Scrivi un messaggio...`}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendButton, !messageText.trim() && styles.sendButtonDisabled]}
              onPress={handleSendMessage}
              disabled={!messageText.trim()}>
              <Text style={styles.sendButtonText}>Invia</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const renderSettingsScreen = () => (
    <ScrollView style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ Impostazioni</Text>
        <Text style={styles.subtitle}>Personalizza la tua esperienza</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Configurazione Attuale</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Scuola: {schoolType || 'Non configurata'}</Text>
          <Text style={styles.infoText}>Ruolo: {userRole || 'Non configurato'}</Text>
          <Text style={styles.infoText}>Nome: {userName || 'Non inserito'}</Text>
          <Text style={styles.infoText}>Classe: {className || 'Non inserita'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Informazioni App</Text>
        <View style={styles.infoCard}>
          <Text style={styles.appTitle}>Sistema di Comunicazione Scolastica</Text>
          <Text style={styles.appDescription}>
            App demo per comunicazione multi-canale tra scuola e famiglie.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#3b82f6" />
      
      {currentTab === 'setup' && renderSetupScreen()}
      {currentTab === 'communication' && renderCommunicationScreen()}
      {currentTab === 'settings' && renderSettingsScreen()}

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBarItem, currentTab === 'setup' && styles.activeTabBarItem]}
          onPress={() => setCurrentTab('setup')}>
          <Text style={[styles.tabBarText, currentTab === 'setup' && styles.activeTabBarText]}>
            Setup
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBarItem, currentTab === 'communication' && styles.activeTabBarItem]}
          onPress={() => setCurrentTab('communication')}>
          <Text style={[styles.tabBarText, currentTab === 'communication' && styles.activeTabBarText]}>
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBarItem, currentTab === 'settings' && styles.activeTabBarItem]}
          onPress={() => setCurrentTab('settings')}>
          <Text style={[styles.tabBarText, currentTab === 'settings' && styles.activeTabBarText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
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
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonActive: {
    backgroundColor: '#10b981',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9ca3af',
  },
  saveButtonTextActive: {
    color: '#ffffff',
  },
  communicationContainer: {
    flex: 1,
  },
  setupRequired: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  setupRequiredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  setupRequiredText: {
    fontSize: 16,
    color: '#6b7280',
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
  messagesList: {
    flex: 1,
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
  },
  sendButton: {
    backgroundColor: '#3b82f6',
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
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
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
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  tabBarItem: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  activeTabBarItem: {
    backgroundColor: '#eff6ff',
  },
  tabBarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabBarText: {
    color: '#3b82f6',
  },
});

export default SchoolApp;