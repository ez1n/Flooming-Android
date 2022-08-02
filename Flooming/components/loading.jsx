import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, ImageBackground, View, ActivityIndicator } from 'react-native';

export default function Loading(props) {
  // header
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/loadingBackground.jpg')}
        style={styles.image}>
        <ActivityIndicator size="large" color="#FCFCFC" />
        <Text style={styles.text}>그림을 그리고 있어요</Text>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FCFCFC',
    fontSize: 30,
    fontFamily: 'symkyungha',
    marginTop: 20,
  },
})