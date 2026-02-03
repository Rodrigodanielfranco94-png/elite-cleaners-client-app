import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

export default function AdminDashboard({ navigation }) {
  const [transacciones, setTransacciones] = useState([]);
  const [totalAcumulado, setTotalAcumulado] = useState(0);

  useEffect(() => {
    // Escuchamos en tiempo real la colección "transacciones" de Firebase
    const q = query(collection(db, "transacciones"), orderBy("creado", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let suma = 0;
      const lista = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lista.push({ id: doc.id, ...data });
        suma += data.monto || 0;
      });
      setTransacciones(lista);
      setTotalAcumulado(suma);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Control de Taxes 2026</Text>
      
      <View style={styles.tarjetaResumen}>
        <Text style={styles.labelResumen}>Total Bruto Acumulado</Text>
        <Text style={styles.montoGrande}>${totalAcumulado.toFixed(2)}</Text>
      </View>

      <Text style={styles.subtitulo}>Historial de Pagos Recibidos</Text>
      
      <FlatList
        data={transacciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemTransaccion}>
            <View>
              <Text style={styles.fechaTexto}>{item.fecha_cita}</Text>
              <Text style={styles.servicioTexto}>{item.servicio}</Text>
            </View>
            <Text style={styles.montoTexto}>+ ${item.monto}</Text>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.botonVolver} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBoton}>SALIR DEL PANEL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5', padding: 25, paddingTop: 60 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1A2A44', marginBottom: 20 },
  tarjetaResumen: { backgroundColor: '#1A2A44', padding: 30, borderRadius: 20, alignItems: 'center', marginBottom: 30 },
  labelResumen: { color: '#fff', opacity: 0.8, fontSize: 14 },
  montoGrande: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginTop: 10 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  itemTransaccion: { backgroundColor: '#fff', padding: 15, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  fechaTexto: { fontWeight: 'bold', color: '#333' },
  servicioTexto: { fontSize: 12, color: '#666' },
  montoTexto: { color: '#10B981', fontWeight: 'bold', fontSize: 16 },
  botonVolver: { marginTop: 20, padding: 15, alignItems: 'center' },
  textoBoton: { color: '#666', fontWeight: 'bold', fontSize: 14 }
});
