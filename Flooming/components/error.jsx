import React from 'react';
import { StyleSheet, ImageBackground, Image, Text } from 'react-native';

export default function Error(props) {
  return (
    <ImageBackground
      source={require('../assets/images/loadingBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.9 }}>
        <Image style={styles.icon} source={require('../assets/errorIcon.png')} />
        <Text style={styles.errorMessageText}>error message</Text>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  errorMessageText: {
    color: '#FCFCFC',
    fontSize: 28,
    fontFamily: 'symkyungha',
  },
})