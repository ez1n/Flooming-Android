import React from 'react';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';

export default function Loading (props) {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/mainBackground.jpg')}
        style={styles.image}>
        <Text style={styles.text}>FLOOMING</Text>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#FCFCFC',
    fontSize: 25,
    top: '40%',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  }
})