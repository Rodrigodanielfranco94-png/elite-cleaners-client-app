import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function RequestQuoteScreen({ navigation }) {
  const [paso, setPaso] = useState(1); // 1: Calendario, 2: Pago, 3: Éxito
  const [diaSeleccionado, setDiaSeleccionado] = useState(3);
  const [horaSeleccionada, setHoraSeleccionada] = useState("11:00 AM");

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const horas = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"];

  const confirmarReserva = async () => {
    try {
      // REGISTRO PARA TAXES: Se guarda en la colección "transacciones"
      await addDoc(collection(db, "transacciones"), {
        servicio: "Limpieza Residencial",
        monto: 50.00,
        fecha_cita: `Octubre ${diaSeleccionado}, 2022`,
        hora: horaSeleccionada,
        estado: "Pagado",
        creado: serverTimestamp()
      });
      setPaso(3); // Mover a pantalla de éxito
    } catch (e) {
      Alert.alert("Error", "No se pudo procesar el pago en Firebase.");
    }
  };

  // --- VISTA 1: CALENDARIO (Réplica exacta de tu imagen) ---
  if (paso === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Servicio de Limpieza</Text>
        <Text style={styles.subtitulo}>Octubre, 2022</Text>
        
        <FlatList
          data={dias}
          numColumns={7}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.cajaDia, diaSeleccionado === item && styles.diaActivo]}
              onPress={() => setDiaSeleccionado(item)}
            >
              <Text style={{color: diaSeleccionado === item ? '#fff' : '#333'}}>{item}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.seccionHoras}>
          <Text style={styles.label}>Selecciona la Hora</Text>
          <View style={styles.gridHoras}>
            {horas.map(h => (
              <TouchableOpacity 
                key={h} 
                style={[styles.botonHora, horaSeleccionada === h && styles.horaActiva]}
                onPress={() => setHoraSeleccionada(h)}
              >
                <Text style={{fontSize: 12, color: horaSeleccionada === h ? '#fff' : '#666'}}>{h}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.botonAzul} onPress={() => setPaso(2)}>
          <Text style={styles.textoBoton}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- VISTA 2: PAGO (Réplica de tu tarjeta azul) ---
  if (paso === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Mis Tarjetas</Text>
        <View style={styles.tarjetaAzul}>
          <Text style={styles.tipoTarjeta}>Tarjeta de Débito</Text>
          <Text style={styles.numeroTarjeta}>4321  1234  2121  0101</Text>
          <View>
            <Text style={styles.labelBalance}>Balance</Text>
            <Text style={styles.montoBalance}>$50,400.00</Text>
          </View>
        </View>

        <View style={styles.resumen}>
          <Text style={styles.resumenTexto}>Servicio: Limpieza Profunda</Text>
          <Text style={styles.resumenTexto}>Total a Pagar: **$50.00**</Text>
        </View>

        <TouchableOpacity style={[styles.botonAzul, {backgroundColor: '#10B981'}]} onPress={confirmarReserva}>
          <Text style={styles.textoBoton}>CONFIRMAR Y PAGAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- VISTA 3: ÉXITO (Escudo verde) ---
  return (
    <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
      <View style={styles.circuloExito}><Text style={{fontSize: 50, color: '#fff'}}>✓</Text></View>
      <Text style={styles.titulo}>¡Orden Realizada!</Text>
      <Text style={{textAlign: 'center', marginTop: 10, color: '#666'}}>Tu cita quedó agendada para el día {diaSeleccionado} a las {horaSeleccionada}.</Text>
      <TouchableOpacity style={styles.botonAzul} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.textoBoton}>FINALIZAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB', padding: 25, paddingTop: 60 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1A2A44' },
  subtitulo: { color: '#666', marginBottom: 20 },
  cajaDia: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', margin: 4 },
  diaActivo: { backgroundColor: '#10B981', borderRadius: 20 },
  seccionHoras: { marginTop: 20 },
  label: { fontWeight: 'bold', marginBottom: 15 },
  gridHoras: { flexDirection: 'row', justifyContent: 'space-between' },
  botonHora: { padding: 10, borderWidth: 1, borderColor: '#DDD', borderRadius: 10 },
  horaActiva: { backgroundColor: '#4A80F5', borderColor: '#4A80F5' },
  botonAzul: { backgroundColor: '#4A80F5', padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 40 },
  textoBoton: { color: '#fff', fontWeight: 'bold' },
  // Estilos Tarjeta Azul
  tarjetaAzul: { backgroundColor: '#1E6AF3', padding: 25, borderRadius: 20, height: 200, justifyContent: 'space-between', marginTop: 20 },
  tipoTarjeta: { color: '#fff', opacity: 0.8 },
  numeroTarjeta: { color: '#fff', fontSize: 18, letterSpacing: 2 },
  labelBalance: { color: '#fff', opacity: 0.7, fontSize: 12 },
  montoBalance: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  resumen: { marginTop: 30, padding: 15, backgroundColor: '#fff', borderRadius: 15 },
  resumenTexto: { fontSize: 16, marginBottom: 5 },
  circuloExito: { width: 100, height: 100, backgroundColor: '#10B981', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }
});
