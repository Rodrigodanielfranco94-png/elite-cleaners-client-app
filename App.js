import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importamos las pantallas de tu carpeta src
import WelcomeScreen from './src/screens/WelcomeScreen';
import RequestQuoteScreen from './src/screens/RequestQuoteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* La pantalla inicial con el banner de 40% off */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* La pantalla con el calendario y el pago */}
        <Stack.Screen name="RequestQuote" component={RequestQuoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
