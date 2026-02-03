import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function EliteCleanersApp() {
  const [step, setStep] = useState(1); // 1: Home, 2: Calendar, 3: Payment
  const [selectedService, setSelectedService] = useState(null);

  // Datos para la réplica exacta
  const services = [
    { id: 1, title: '4 Bedrooms\n1 Kitchen', price: 50, img: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
    { id: 2, title: '3 Bedrooms\n1 Kitchen', price: 40, img: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
    { id: 3, title: '2 Bedrooms\n1 Kitchen', price: 30, img: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
  ];

  // --- VISTA 1: HOME (REPLICANDO IMAGEN 1) ---
  if (step === 1) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Need Cleaning Service?</Text>
          <Text style={styles.headerDesc}>Duis volutpat nisl quis lacus sodales, ac imperdiet augue dapibus.</Text>
        </View>

        <View style={styles.promoBanner}>
          <Text style={styles.promoText}>40% off</Text>
          <Text style={styles.promoSub}>On first cleaning service</Text>
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

  // --- VISTA 2: PAGO (REPLICANDO IMAGEN DE TARJETA AZUL) ---
  if (step === 2) {
    return (
      <View style={styles.container}>
        <Text style={[styles.headerTitle, {marginTop: 60, marginLeft: 20}]}>My Cards</Text>
        
        <View style={styles.creditCard}>
          <Text style={styles.cardType}>My Debit Card</Text>
          <Text style={styles.cardNumber}>4321  1234  2121  0101</Text>
          <View style={{marginTop: 20}}>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balanceAmount}>$50,400.00</Text>
          </View>
        </View>

        <View style={{padding: 20}}>
            <TouchableOpacity style={styles.mainButton} onPress={() => alert("Pago Confirmado!")}>
                <Text style={styles.mainButtonText}>CONFIRM ($50)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(1)} style={{marginTop: 20, alignItems: 'center'}}>
                <Text style={{color: '#666'}}>CANCEL</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { padding: 25, marginTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  headerDesc: { color: '#999', marginTop: 10, fontSize: 14 },
  promoBanner: { backgroundColor: '#4A80F5', margin: 20, padding: 20, borderRadius: 15, flexDirection: 'column' },
  promoText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  promoSub: { color: '#fff', opacity: 0.8 },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
  serviceCard: { width: width * 0.28, backgroundColor: '#fff', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  selectedCard: { borderWidth: 2, borderColor: '#4A80F5' },
  cardIcon: { width: 40, height: 40, marginBottom: 10 },
  cardTitle: { fontSize: 10, textAlign: 'center', fontWeight: '600' },
  mainButton: { backgroundColor: '#4A80F5', margin: 20, padding: 18, borderRadius: 30, alignItems: 'center' },
  mainButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  // Estilos de la Tarjeta de Crédito
  creditCard: { backgroundColor: '#1E6AF3', margin: 20, padding: 25, borderRadius: 20, height: 200, justifyContent: 'space-between' },
  cardType: { color: '#fff', fontSize: 16, opacity: 0.9 },
  cardNumber: { color: '#fff', fontSize: 20, letterSpacing: 2, marginTop: 20 },
  balanceLabel: { color: '#fff', opacity: 0.7, fontSize: 12 },
  balanceAmount: { color: '#fff', fontSize: 26, fontWeight: 'bold' }
});
