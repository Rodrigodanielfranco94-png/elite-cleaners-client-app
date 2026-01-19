import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function RequestQuoteScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Nueva Solicitud</Text>
      
      <Text style={styles.label}>¿Qué tipo de limpieza necesitas?</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.chipSelected}><Text>Deep Clean</Text></TouchableOpacity>
        <TouchableOpacity style={styles.chip}><Text>Mantenimiento</Text></TouchableOpacity>
      </View>

      <Text style={styles.label}>Detalles de la propiedad</Text>
      <TextInput style={styles.input} placeholder="Ej. 3 recámaras, 2 baños" />
      
      <TouchableOpacity style={styles.photoButton}>
        <Text style={styles.photoText}>📷 Subir Fotos de las áreas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Enviar al Admin</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#002D62', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 15 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 10, marginBottom: 20 },
  chip: { padding: 10, borderRadius: 20, borderWidth: 1, borderColor: '#ccc', marginRight: 10 },
  chipSelected: { padding: 10, borderRadius: 20, backgroundColor: '#D4AF37', marginRight: 10 },
  row: { flexDirection: 'row', marginTop: 10 },
  photoButton: { padding: 40, borderStyle: 'dashed', borderWidth: 2, borderColor: '#D4AF37', alignItems: 'center', marginTop: 20 },
  submitButton: { backgroundColor: '#002D62', padding: 15, borderRadius: 10, marginTop: 30, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: 'bold' }
});
