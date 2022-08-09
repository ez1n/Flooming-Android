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
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    borderRadius: 16,
    marginBottom: 5,
  },
  textButton: {
    color: '#FCFCFC',
    fontSize: 25,
    height: 35,
    fontFamily: 'symkyungha',
  },
})