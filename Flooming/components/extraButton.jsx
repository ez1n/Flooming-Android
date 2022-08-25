import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ExtraButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.textButton}>{props.text}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0C0B0C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 15,
    paddingTop: 7,
    paddingBottom: 7
  },
  textButton: {
    color: '#FCFCFC',
    fontSize: 15,
    fontFamily: 'symkyungha',
  },
})