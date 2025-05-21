import React from 'react';
import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface DetalheProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function Detalhe({ text, onPress }: DetalheProps) {
  return (
    <TouchableOpacity style={styles.contanier} onPress={onPress}>
      <Text style={styles.button}>{text}</Text>
      <AntDesign name="right" size={24} color="#717171" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contanier: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: 200,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginHorizontal: 83,
    marginVertical: 20,
    elevation: 4,
  },
  button: {
    color: '#717171',
    marginEnd: 8,
  },
});
