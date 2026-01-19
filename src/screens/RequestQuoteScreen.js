import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function RequestQuoteScreen({ navigation }) {
  const [address, setAddress] = useState('');
  const [serviceType, setServiceType] = useState('Residencial');
  const [details, setDetails] = useState('');

  const sendRequest = async () => {
    if (!address || !details) {
      Alert.alert("Campos incompletos", "Por favor llena la dirección y detalles.");
      return;
    }

    try {
      await addDoc(collection(db, "solicitudes"), {
        address,
        serviceType,
        details,
        status: "Pendiente",
        date: new Date().toISOString()
      });
      Alert.alert("¡Enviado!", "Dayana revisará tu solicitud pronto.");
      navigation.navigate('Welcome');
    } catch (e) {
      Alert.alert("Error", "No se pudo enviar la solicitud.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Nueva Solicitud</Text>
      
      <Text style={styles.label}>Dirección del Servicio</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ej: 123 Luxury Ave, Miami" 
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Tipo de Limpieza</Text>
      <View style={styles.pickerContainer}>
        {['Residencial', 'Comercial', 'Post-Construcción'].map((type) => (
          <TouchableOpacity 
            key={type} 
            style={[styles.chip, serviceType === type && styles.chipActive]}
            onPress={() => setServiceType(type)}
          >
            <Text style={serviceType === type ? styles.chipTextActive : styles.chipText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Detalles Adicionales</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        placeholder="Ej: 3 habitaciones, limpieza profunda de cocina..." 
        multiline
        numberOfLines={4}
        onChangeText={setDetails}
      />

      <TouchableOpacity style={styles.mainButton} onPress={sendRequest}>
        <Text style={styles.mainButtonText}>ENVIAR SOLICITUD PREMIUM</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#002D62', marginBottom: 20, marginTop: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#DDD' },
  textArea: { height: 100, textAlignVertical: 'top' },
  pickerContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  chip: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#E9ECEF' },
  chipActive: { backgroundColor: '#002D62' },
  chipText: { color: '#666' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  mainButton: { backgroundColor: '#002D62', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  mainButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
