import React from 'react';
import { StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity } from 'react-native';
import Button from './button';

const ImageCheck = (props) => {
  return (
    <ImageBackground
      source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.titleContainer}></View>
      
      <View style={styles.imageContainer}>
        <Image style={styles.exImage} source={require('../assets/images/imageEx.jpg')} />

        <View style={styles.imageButtonContainer}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>사진 찍기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>앨범에서 가져오기</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.buttonContainer}>
        <Button text={'사진 선택'} />
      </View>
    </ImageBackground>
  )
};

export default ImageCheck;

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFCFC',
  },
  imageContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  exImage: {
    width: '100%'
  },
  imageButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonText: {
    color: '#FCFCFC',
    fontSize: 25,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    bottom: 70,
  },
})