import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingButton (props) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={props.handleBack}>
        <Text style={styles.footerText}>{props.LeftLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.handleNext}>
        <Text style={styles.footerText}>{props.RightLabel}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  footerText: {
    fontSize: 20,
    color: '#D3D3D3',
  },
})