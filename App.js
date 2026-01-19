import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importamos tus pantallas profesionales
import RegisterScreen from './src/screens/RegisterScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RequestQuoteScreen from './src/screens/RequestQuoteScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Definimos el orden de las pantallas */}
      <Stack.Navigator initialRouteName="Register">
        
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Crear Cuenta Élite' }} 
        />
        
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ title: 'Bienvenido' }} 
        />
        
        <Stack.Screen 
          name="RequestQuote" 
          component={RequestQuoteScreen} 
          options={{ title: 'Solicitar Cotización' }} 
        />
        
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{ title: 'Chat de Negociación' }} 
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
