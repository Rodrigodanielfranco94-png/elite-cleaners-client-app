import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        <View style={styles.adminMsg}>
          <Text style={styles.msgText}>Hola! Vi tus fotos. El servicio profundo para tu casa de 3 hab cuesta $250. Te interesa?</Text>
        </View>
        
        <View style={styles.clientMsg}>
          <Text style={styles.msgText}>Me parece bien, ¿pueden venir el lunes?</Text>
        </View>

        {/* Tarjeta de presupuesto que el cliente acepta */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteTitle}>Presupuesto Final</Text>
          <Text style={styles.quotePrice}>$250.00</Text>
          <TouchableOpacity style={styles.acceptBtn}>
            <Text style={{color: '#002D62', fontWeight: 'bold'}}>ACEPTAR Y AGENDAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput style={styles.input} placeholder="Escribe un mensaje..." />
        <TouchableOpacity style={styles.sendBtn}><Text>➡️</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  chatBox: { flex: 1, padding: 15 },
  adminMsg: { backgroundColor: '#002D62', padding: 12, borderRadius: 15, alignSelf: 'flex-start', maxWidth: '80%', marginBottom: 10 },
  clientMsg: { backgroundColor: '#fff', padding: 12, borderRadius: 15, alignSelf: 'flex-end', maxWidth: '80%', marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  msgText: { color: '#fff' },
  quoteCard: { backgroundColor: '#D4AF37', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 20 },
  quoteTitle: { fontWeight: 'bold', fontSize: 16 },
  quotePrice: { fontSize: 24, fontWeight: 'bold', marginVertical: 5 },
  acceptBtn: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginTop: 10 },
  inputArea: { flexDirection: 'row', padding: 15, backgroundColor: '#fff', alignItems: 'center' },
  input: { flex: 1, height: 40, borderBottomWidth: 1, borderColor: '#ccc' },
  sendBtn: { marginLeft: 10, padding: 10 }
});
