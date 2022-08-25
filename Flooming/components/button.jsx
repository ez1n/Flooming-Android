import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.textButton}>{props.text}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0C0B0C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    width: '90%',
    borderRadius: 16,
    marginBottom: 5,
  },
  textButton: {
    color: '#FCFCFC',
    fontSize: 15,
    fontFamily: 'symkyungha',
  },
})