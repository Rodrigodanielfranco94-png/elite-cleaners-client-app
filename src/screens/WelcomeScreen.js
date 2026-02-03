import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  // Datos de los servicios basados en tu diseño
  const servicios = [
    { id: 1, titulo: '4 Habitaciones\n1 Cocina', precio: '$50', img: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
    { id: 2, titulo: '3 Habitaciones\n1 Cocina', precio: '$40', img: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
    { id: 3, titulo: '2 Habitaciones\n1 Cocina', precio: '$30', img: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>¿Necesitas Limpieza?</Text>
        <Text style={styles.descHeader}>Selecciona el paquete ideal para tu hogar.</Text>
      </View>

      {/* Banner de Descuento (Réplica de tu imagen) */}
      <View style={styles.bannerPromo}>
        <View>
          <Text style={styles.textoPromo}>40% de descuento</Text>
          <Text style={styles.subPromo}>En tu primera limpieza</Text>
        </View>
        <Image 
          source={{ uri: 'https://img.freepik.com/free-photo/cleaning-service-woman-yellow-gloves-holding-sprayer_23-2148455028.jpg' }} 
          style={styles.imgPromo} 
        />
      </View>

      {/* Rejilla de Servicios */}
      <View style={styles.gridServicios}>
        {servicios.map((item) => (
          <TouchableOpacity key={item.id} style={styles.tarjetaServicio}>
            <Image source={{ uri: item.img }} style={styles.iconoServicio} />
            <Text style={styles.tituloServicio}>{item.titulo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón Principal para ir al Calendario */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.botonPrincipal} 
          onPress={() => navigation.navigate('RequestQuote')}
        >
          <Text style={styles.textoBoton}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 25, marginTop: 30 },
  tituloHeader: { fontSize: 26, fontWeight: 'bold', color: '#1A2A44' },
  descHeader: { color: '#888', marginTop: 5 },
  bannerPromo: { backgroundColor: '#4A80F5', margin: 20, padding: 20, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textoPromo: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  subPromo: { color: '#fff', opacity: 0.9 },
  imgPromo: { width: 80, height: 80, borderRadius: 10 },
  gridServicios: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
  tarjetaServicio: { width: width * 0.28, backgroundColor: '#F0F4FF', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 15 },
  iconoServicio: { width: 40, height: 40, marginBottom: 10 },
  tituloServicio: { fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: '#1A2A44' },
  footer: { padding: 20 },
  botonPrincipal: { backgroundColor: '#4A80F5', padding: 18, borderRadius: 15, alignItems: 'center' },
  textoBoton: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
