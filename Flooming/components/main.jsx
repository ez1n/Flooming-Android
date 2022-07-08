import React from 'react';
import { StyleSheet, Text, ImageBackground, View, Button, TouchableOpacity } from 'react-native';


export default function Main(props) {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/mainBackground.jpg')}
        style={styles.image}>

        <View style={styles.textContainer}>
          <Text style={styles.innerText}>마음에 드는</Text>
          <Text style={styles.innerText}>꽃 사진을 그림으로</Text>
          <Text style={styles.innerText}>바꿔봐요.</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>지금 해볼래요</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    top: '15%',
  },
  textContainer: {
    top: '10%',
  },
  innerText: {
    color: '#FFF9C3',
    fontSize: 40,
    paddingLeft: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0C0B0C',
    alignItems: 'center',
    padding: 10,
    width: '80%',
    bottom: '10%',
    borderRadius: 16,
  },
  textButton: {
    color: '#FCFCFC',
    fontSize: 25,
  },
})