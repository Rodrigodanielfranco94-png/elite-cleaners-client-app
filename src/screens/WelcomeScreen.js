import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  
  const accesoAdmin = () => {
    Alert.prompt(
      "Acceso Restringido",
      "Ingresa la contraseña de administrador:",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Entrar",
          onPress: (password) => {
            if (password === '1234') { // <--- AQUÍ pones tu clave secreta
              navigation.navigate('Admin');
            } else {
              Alert.alert("Error", "Contraseña incorrecta");
            }
          }
        }
      ],
      "secure-text"
    );
  };

  return (
    <View style={styles.container}>
      {/* Tu código actual del Welcome (Banner, servicios, etc.) */}
      
      <Text style={styles.titulo}>Bienvenido a Élite Cleaners</Text>

      <TouchableOpacity style={styles.botonCliente} onPress={() => navigation.navigate('RequestQuote')}>
        <Text style={styles.textoBoton}>RESERVAR LIMPIEZA</Text>
      </TouchableOpacity>

      {/* Botón "Secreto" para ti */}
      <TouchableOpacity style={styles.botonAdmin} onPress={accesoAdmin}>
        <Text style={styles.textoAdmin}>Ver Taxes (Admin)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FB' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  botonCliente: { backgroundColor: '#4A80F5', padding: 20, borderRadius: 30, width: '80%', alignItems: 'center' },
  textoBoton: { color: '#fff', fontWeight: 'bold' },
  botonAdmin: { marginTop: 50, opacity: 0.5 },
  textoAdmin: { color: '#666', fontSize: 12, textDecorationLine: 'underline' }
});
