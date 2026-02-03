import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';

export default function AdminDashboard() {
  const [total, setTotal] = useState(0);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "transacciones"));
    const unsub = onSnapshot(q, (snapshot) => {
      let suma = 0;
      const docs = [];
      snapshot.forEach(doc => {
        suma += doc.data().monto;
        docs.push({id: doc.id, ...doc.data()});
      });
      setTotal(suma);
      setVentas(docs);
    });
    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Reporte de Impuestos 2026</Text>
      <View style={styles.cardTotal}>
        <Text style={{color: '#fff'}}>Ingreso Total Bruto</Text>
        <Text style={styles.montoTotal}>${total.toFixed(2)}</Text>
      </View>
      <Text style={styles.sub}>Historial de Ingresos:</Text>
      <FlatList 
        data={ventas}
        renderItem={({item}) => (
          <View style={styles.item}><Text>{item.fecha_cita}</Text><Text style={{fontWeight:'bold'}}>${item.monto}</Text></View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 60, backgroundColor: '#fff' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  cardTotal: { backgroundColor: '#1A2A44', padding: 30, borderRadius: 15, alignItems: 'center' },
  montoTotal: { color: '#fff', fontSize: 35, fontWeight: 'bold' },
  sub: { marginTop: 25, fontWeight: 'bold', fontSize: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderColor: '#eee' }
});
