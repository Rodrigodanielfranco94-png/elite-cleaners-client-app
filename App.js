import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de las pantallas que tienes en tu carpeta src/screens
// Asegúrate de que los nombres de los archivos coincidan exactamente
import WelcomeScreen from './src/screens/WelcomeScreen';
import RequestQuoteScreen from './src/screens/RequestQuoteScreen';
import AdminDashboard from './src/screens/AdminDashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false, // Ocultamos la barra superior para mantener el look de la réplica
          cardStyle: { backgroundColor: '#F8F9FB' }
        }}
      >
        {/* 1. Pantalla de Inicio (Réplica con banner 40% off) */}
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
        />

        {/* 2. Pantalla de Proceso (Calendario + Tarjeta Azul de Pago) */}
        <Stack.Screen 
          name="RequestQuote" 
          component={RequestQuoteScreen} 
        />

        {/* 3. Pantalla de Administrador (Taxes e Ingresos - Privada) */}
        <Stack.Screen 
          name="Admin" 
          component={AdminDashboard} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
