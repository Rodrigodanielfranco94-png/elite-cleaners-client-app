import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

export default function EliteCleanersApp() {
  const [step, setStep] = useState(1); 
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(3); // Simulando el día 3 como en tu imagen
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

  const services = [
    { id: 1, title: '4 Bedrooms\n1 Kitchen', price: 50, img: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
    { id: 2, title: '3 Bedrooms\n1 Kitchen', price: 40, img: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
    { id: 3, title: '2 Bedrooms\n1 Kitchen', price: 30, img: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const times = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 AM"];

  // --- VISTA 1: HOME ---
  if (step === 1) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Need Cleaning Service?</Text>
          <Text style={styles.headerDesc}>Selecciona el paquete que mejor se adapte a tu hogar.</Text>
        </View>
        <View style={styles.promoBanner}>
          <Text style={styles.promoText}>40% off</Text>
          <Text style={styles.promoSub}>En tu primera limpieza</Text>
        </View>
        <View style={styles.serviceGrid}>
          {services.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.serviceCard, selectedService === item.id && styles.selectedCard]}
              onPress={() => setSelectedService(item.id)}
            >
              <Image source={{ uri: item.img }} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.mainButton} onPress={() => setStep(2)}>
          <Text style={styles.mainButtonText}>PROCEED</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // --- VISTA 2: CALENDARIO (REPLICANDO TU IMAGEN DE OCTOBER 2022) ---
  if (step === 2) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Cleaning Service</Text>
            <Text style={{color: '#666'}}>October, 2022</Text>
        </View>
        
        <FlatList
          data={days}
          numColumns={7}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{paddingHorizontal: 20}}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.dayCircle, selectedDate === item && styles.selectedDay]}
              onPress={() => setSelectedDate(item)}
            >
              <Text style={{color: selectedDate === item ? '#fff' : '#333'}}>{item}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={{padding: 20}}>
            <Text style={styles.label}>Pick Time</Text>
            <View style={styles.timeGrid}>
                {times.map(t => (
                    <TouchableOpacity 
                        key={t} 
                        style={[styles.timeSlot, selectedTime === t && styles.selectedTimeSlot]}
                        onPress={() => setSelectedTime(t)}
                    >
                        <Text style={{fontSize: 12, color: selectedTime === t ? '#fff' : '#666'}}>{t}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.mainButton} onPress={() => setStep(3)}>
                <Text style={styles.mainButtonText}>PROCEED</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- VISTA 3: PAGO (TU TARJETA AZUL) ---
  if (step === 3) {
    return (
      <View style={styles.container}>
        <Text style={[styles.headerTitle, {marginTop: 60, marginLeft: 20}]}>My Cards</Text>
        <View style={styles.creditCard}>
          <Text style={styles.cardType}>My Debit Card</Text>
          <Text style={styles.cardNumber}>4321  1234  2121  0101</Text>
          <View>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balanceAmount}>$50,400.00</Text>
          </View>
        </View>
        <View style={{padding: 20}}>
            <TouchableOpacity style={styles.mainButton} onPress={() => setStep(4)}>
                <Text style={styles.mainButtonText}>CONFIRM ($50)</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- VISTA 4: ÉXITO (ESCUDO VERDE) ---
  if (step === 4) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <View style={styles.successCircle}>
            <Text style={{color: '#fff', fontSize: 50}}>✓</Text>
        </View>
        <Text style={styles.headerTitle}>Order Placed</Text>
        <Text style={{textAlign: 'center', padding: 20, color: '#666'}}>
            Tu limpieza ha sido agendada con éxito. Recibirás un recordatorio 24 horas antes.
        </Text>
        <TouchableOpacity style={styles.mainButton} onPress={() => setStep(1)}>
            <Text style={styles.mainButtonText}>GO TO HOMEPAGE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { padding: 25, marginTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  headerDesc: { color: '#999', marginTop: 5, fontSize: 14 },
  promoBanner: { backgroundColor: '#4A80F5', margin: 20, padding: 20, borderRadius: 15 },
  promoText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  promoSub: { color: '#fff', opacity: 0.8 },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
  serviceCard: { width: width * 0.28, backgroundColor: '#fff', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 15, elevation: 2 },
  selectedCard: { borderWidth: 2, borderColor: '#4A80F5' },
  cardIcon: { width: 35, height: 35, marginBottom: 10 },
  cardTitle: { fontSize: 9, textAlign: 'center', fontWeight: 'bold' },
  mainButton: { backgroundColor: '#4A80F5', padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  mainButtonText: { color: '#fff', fontWeight: 'bold' },
  // Estilos Calendario
  dayCircle: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', margin: 5 },
  selectedDay: { backgroundColor: '#10B981', borderRadius: 20 },
  label: { fontWeight: 'bold', marginBottom: 10 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  timeSlot: { padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 10, width: '22%', alignItems: 'center' },
  selectedTimeSlot: { backgroundColor: '#4A80F5', borderColor: '#4A80F5' },
  // Estilos Tarjeta
  creditCard: { backgroundColor: '#1E6AF3', margin: 20, padding: 25, borderRadius: 20, height: 200, justifyContent: 'space-between' },
  cardNumber: { color: '#fff', fontSize: 18, letterSpacing: 2 },
  balanceAmount: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  balanceLabel: { color: '#fff', opacity: 0.7, fontSize: 10 },
  cardType: { color: '#fff', opacity: 0.8 },
  // Éxito
  successCircle: { width: 100, height: 100, backgroundColor: '#10B981', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }
});
