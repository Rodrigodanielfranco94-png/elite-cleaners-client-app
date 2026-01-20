import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function BookingScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const times = ["08:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agenda tu Limpieza</Text>
      <Text style={styles.subtitle}>Selecciona el mejor momento para ti</Text>

      {/* Sección de Calendario (Simplificada) */}
      <View style={styles.section}>
        <Text style={styles.label}>1. Elige la fecha</Text>
        <View style={styles.calendarPlaceholder}>
          <Text>📅 [Aquí irá nuestro Calendario Interactivo]</Text>
        </View>
      </View>

      {/* Sección de Horarios */}
      <View style={styles.section}>
        <Text style={styles.label}>2. Selecciona la hora</Text>
        <View style={styles.timeGrid}>
          {times.map((time) => (
            <TouchableOpacity 
              key={time} 
              style={[styles.timeButton, selectedTime === time && styles.selected]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={selectedTime === time ? styles.timeTextSelected : styles.timeText}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Botón de Confirmación */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Continuar al Pago</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a2a44', marginTop: 40 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  section: { marginBottom: 30 },
  label: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
  calendarPlaceholder: { height: 200, backgroundColor: '#f0f4f8', borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeButton: { width: '45%', padding: 15, borderRadius: 10, backgroundColor: '#f8f9fa', marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  selected: { backgroundColor: '#d4af37', borderColor: '#d4af37' }, // Color dorado de tu logo
  timeText: { color: '#1a2a44', fontWeight: '500' },
  timeTextSelected: { color: '#fff', fontWeight: 'bold' },
  confirmButton: { backgroundColor: '#1a2a44', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 10, marginBottom: 50 },
  confirmText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
