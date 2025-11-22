import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Text,
} from 'react-native';
import {SchoolContextProvider} from './src/context/SchoolContext';
import SchoolSetupScreen from './src/screens/SchoolSetupScreen';
import CommunicationScreen from './src/screens/CommunicationScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { colors } from './src/styles/colors';
import { getStatusBarHeight } from './src/styles/dimensions';

const Tab = createBottomTabNavigator();
//ciao
function App(): JSX.Element {
  return (
    <SchoolContextProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={colors.primary[600]} 
          translucent={false}
        />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.primary[500],
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTintColor: colors.text.inverse,
              headerTitleStyle: {
                fontWeight: '600',
                fontSize: 18,
              },
              tabBarActiveTintColor: colors.primary[500],
              tabBarInactiveTintColor: colors.text.tertiary,
              tabBarStyle: {
                backgroundColor: colors.background.primary,
                borderTopWidth: 1,
                borderTopColor: colors.border.light,
                paddingBottom: Platform.OS === 'ios' ? 20 : 8,
                paddingTop: 8,
                height: Platform.OS === 'ios' ? 85 : 65,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
              },
              tabBarIconStyle: {
                marginBottom: 2,
              },
            }}>
            <Tab.Screen 
              name="Setup" 
              component={SchoolSetupScreen}
              options={{
                title: 'Configurazione',
                tabBarLabel: 'Setup',
                tabBarIcon: ({ color, size }) => (
                  <Text style={{ fontSize: size, color }}>⚙️</Text>
                ),
              }}
            />
            <Tab.Screen 
              name="Communication" 
              component={CommunicationScreen}
              options={{
                title: 'Comunicazioni',
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color, size }) => (
                  <Text style={{ fontSize: size, color }}>💬</Text>
                ),
              }}
            />
            <Tab.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{
                title: 'Impostazioni',
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => (
                  <Text style={{ fontSize: size, color }}>🔧</Text>
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SchoolContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
  },
});

export default App;