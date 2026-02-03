import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, query, onSnapshot, sum } from 'firebase/firestore';

export default function AdminDashboard({ navigation }) {
  const [transacciones, setTransacciones] = useState([]);
  const [totalTaxes, setTotalTaxes] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "solicitudes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let total = 0;
      const list = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        list.push({ id: doc.id, ...data });
        total += data.monto || 0;
      });
      setTransacciones(list);
      setTotalTaxes(total);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Panel de Control - Élite Cleaners</Text>
      
      <View style={styles.cardResumen}>
        <Text style={styles.resumenLabel}>Total Acumulado (Taxes 2026)</Text>
        <Text style={styles.resumenMonto}>${totalTaxes.toFixed(2)}</Text>
      </View>

      <Text style={styles.subHeader}>Historial de Pagos</Text>
      <FlatList
        data={transacciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemFecha}>{item.fecha_servicio}</Text>
            <Text style={styles.itemMonto}>+ ${item.monto}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5', padding: 25, paddingTop: 60 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#1A2A44', marginBottom: 20 },
  cardResumen: { backgroundColor: '#1A2A44', padding: 30, borderRadius: 20, alignItems: 'center', marginBottom: 30 },
  resumenLabel: { color: '#fff', opacity: 0.8, fontSize: 14 },
  resumenMonto: { color: '#fff', fontSize: 40, fontWeight: 'bold', marginTop: 10 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  item: { backgroundColor: '#fff', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  itemFecha: { color: '#333', fontWeight: '500' },
  itemMonto: { color: '#10B981', fontWeight: 'bold' },
  backButton: { marginTop: 20, alignItems: 'center' },
  backButtonText: { color: '#666', fontWeight: 'bold' }
});
