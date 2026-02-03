import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de tus pantallas
import WelcomeScreen from './src/screens/WelcomeScreen';
import RequestQuoteScreen from './src/screens/RequestQuoteScreen';
import AdminDashboard from './src/screens/AdminDashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RequestQuote" component={RequestQuoteScreen} />
        <Stack.Screen name="Admin" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
