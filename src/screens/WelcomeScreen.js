import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Élite Cleaners Company</Text>
      <Text style={styles.subtitle}>Calidad que transforma tu hogar.</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comenzar Solicitud</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#002D62' },
  title: { fontSize: 28, color: '#D4AF37', fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#fff', marginBottom: 40 },
  button: { backgroundColor: '#D4AF37', padding: 15, borderRadius: 10 },
  buttonText: { color: '#002D62', fontWeight: 'bold', fontSize: 18 }
});
