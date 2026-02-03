import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function RequestQuoteScreen({ navigation }) {
  const [step, setStep] = useState(1); // 1: Calendario, 2: Pago
  const [selectedDate, setSelectedDate] = useState(3);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleFinalConfirm = async () => {
    try {
      // Registro automático para tus TAXES en Firebase
      await addDoc(collection(db, "solicitudes"), {
        fecha_servicio: `Octubre ${selectedDate}, 2022`,
        hora: selectedTime,
        monto: 50,
        status: "Pagado",
        createdAt: serverTimestamp()
      });
      
      Alert.alert("¡Éxito!", "Orden realizada. Se guardó el registro para taxes.");
      navigation.navigate('Welcome');
    } catch (e) {
      Alert.alert("Error", "No se pudo procesar el pago.");
    }
  };

  if (step === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Cleaning Service</Text>
        <Text style={styles.dateSubtitle}>October, 2022</Text>
        
        <FlatList
          data={days}
          numColumns={7}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.dayCircle, selectedDate === item && styles.selectedDay]}
              onPress={() => setSelectedDate(item)}
            >
              <Text style={{color: selectedDate === item ? '#fff' : '#333'}}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.toString()}
        />

        <TouchableOpacity style={styles.mainButton} onPress={() => setStep(2)}>
          <Text style={styles.mainButtonText}>PROCEED TO PAYMENT</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Cards</Text>
      <View style={styles.creditCard}>
        <Text style={{color: '#fff'}}>My Debit Card</Text>
        <Text style={styles.cardNumber}>4321  1234  2121  0101</Text>
        <View>
          <Text style={{color: '#fff', opacity: 0.7}}>Balance</Text>
          <Text style={styles.balanceAmount}>$50,400.00</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.mainButton, {backgroundColor: '#10B981'}]} onPress={handleFinalConfirm}>
        <Text style={styles.mainButtonText}>CONFIRM ($50.00)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB', padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  dateSubtitle: { color: '#666', marginBottom: 20 },
  dayCircle: { width: 45, height: 45, justifyContent: 'center', alignItems: 'center', margin: 2 },
  selectedDay: { backgroundColor: '#10B981', borderRadius: 25 },
  mainButton: { backgroundColor: '#4A80F5', padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 40 },
  mainButtonText: { color: '#fff', fontWeight: 'bold' },
  creditCard: { backgroundColor: '#1E6AF3', padding: 25, borderRadius: 20, height: 200, justifyContent: 'space-between', marginTop: 20 },
  cardNumber: { color: '#fff', fontSize: 20, letterSpacing: 2 },
  balanceAmount: { color: '#fff', fontSize: 26, fontWeight: 'bold' }
});
