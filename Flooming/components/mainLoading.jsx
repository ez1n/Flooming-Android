import React from 'react';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import Footer from './onBoarding/footer';

export default function MainLoading(props) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/loadingBackground.jpg')}
        style={styles.image}>
        <Text style={styles.text}>FLOOMING</Text>
      </ImageBackground>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    color: '#FCFCFC',
    fontSize: 25,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})