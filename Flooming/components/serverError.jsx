import React, { useLayoutEffect } from 'react';
import { StyleSheet, ImageBackground, Image, Text, View, BackHandler } from 'react-native';
import Button from './button';

export default function ServerError(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/loadingBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.9 }}>
      <View style={styles.contentContainer}>
        <Image style={styles.icon} source={require('../assets/serverErrorIcon.png')} />
        <Text style={styles.errorMessageText}>{props.message}</Text>

        <View style={styles.buttonContainer}>
          <Button text={'종료하기'} onPress={() => BackHandler.exitApp()} />
        </View>
      </View>
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
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  errorMessageText: {
    color: '#FCFCFC',
    fontSize: 20,
    fontFamily: 'symkyungha',
  },
  buttonContainer: {
    width: 120,
    marginTop: 40
  }
})