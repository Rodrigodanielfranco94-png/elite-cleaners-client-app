import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function RequestQuoteScreen({ navigation }) {
  const [paso, setPaso] = useState(1); // 1: Calendario, 2: Pago, 3: Éxito
  const [diaSeleccionado, setDiaSeleccionado] = useState(3);
  const dias = Array.from({ length: 31 }, (_, i) => i + 1);

  const procesarPago = async () => {
    try {
      await addDoc(collection(db, "transacciones"), {
        servicio: "Limpieza Premium",
        monto: 50,
        fecha_cita: `Octubre ${diaSeleccionado}, 2022`,
        estado: "Pagado",
        creado: serverTimestamp()
      });
      setPaso(3);
    } catch (e) {
      Alert.alert("Error", "No se pudo conectar con Firebase.");
    }
  };

  // VISTA: CALENDARIO
  if (paso === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Servicio de Limpieza</Text>
        <Text style={styles.subtitulo}>Octubre, 2022</Text>
        <FlatList
          data={dias}
          numColumns={7}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.cajaDia, diaSeleccionado === item && styles.diaActivo]}
              onPress={() => setDiaSeleccionado(item)}
            >
              <Text style={{color: diaSeleccionado === item ? '#fff' : '#333'}}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.toString()}
        />
        <TouchableOpacity style={styles.botonAzul} onPress={() => setPaso(2)}>
          <Text style={styles.textoBoton}>CONTINUAR AL PAGO</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // VISTA: PAGO (TARJETA AZUL)
  if (paso === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Mis Tarjetas</Text>
        <View style={styles.tarjeta}>
          <Text style={styles.textoBlanco}>Mi Tarjeta de Débito</Text>
          <Text style={styles.numeroTarjeta}>4321  1234  2121  0101</Text>
          <View>
            <Text style={[styles.textoBlanco, {opacity: 0.7}]}>Balance</Text>
            <Text style={styles.balance}>$50,400.00</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.botonAzul, {backgroundColor: '#10B981'}]} onPress={procesarPago}>
          <Text style={styles.textoBoton}>CONFIRMAR PAGO ($50)</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // VISTA: ÉXITO (ESCUDO VERDE)
  return (
    <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
      <View style={styles.circuloExito}><Text style={{fontSize: 50, color: '#fff'}}>✓</Text></View>
      <Text style={styles.titulo}>Orden Realizada</Text>
      <Text style={{textAlign: 'center', marginVertical: 20}}>Tu limpieza para el día {diaSeleccionado} ha sido agendada.</Text>
      <TouchableOpacity style={styles.botonAzul} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.textoBoton}>VOLVER AL INICIO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB', padding: 25, paddingTop: 60 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subtitulo: { color: '#666', marginBottom: 20 },
  cajaDia: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', margin: 4 },
  diaActivo: { backgroundColor: '#10B981', borderRadius: 20 },
  botonAzul: { backgroundColor: '#4A80F5', padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 30 },
  textoBoton: { color: '#fff', fontWeight: 'bold' },
  tarjeta: { backgroundColor: '#1E6AF3', padding: 25, borderRadius: 20, height: 200, justifyContent: 'space-between', marginTop: 20 },
  numeroTarjeta: { color: '#fff', fontSize: 20, letterSpacing: 2 },
  balance: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  textoBlanco: { color: '#fff' },
  circuloExito: { width: 100, height: 100, backgroundColor: '#10B981', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }
});
