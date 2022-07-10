import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from './button';


export default function Main(props) {

  return (
    <ImageBackground
    source={require('../assets/images/mainBackground.jpg')}
    style={styles.backgroundImage}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>FLOOMING</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.innerText}>마음에 드는 <Text style={{ fontWeight: 'bold' }}>꽃</Text>을</Text>
        <Text style={styles.innerText}><Text style={{ fontWeight: 'bold' }}>그림</Text>으로 바꿔봐요.</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image style={styles.exImage} source={require('../assets/images/imageEx.jpg')}></Image>
        <FontAwesome name='arrow-right' size={24} color='#FFF9C3' />
        <Image style={styles.exImage} source={require('../assets/images/illustrationimageEx.jpg')}></Image>
      </View>

      <View style={styles.buttonContainer}>
        <Button text={'지금 해볼래요'} />
      </View>
    </ImageBackground>
  )
};

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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textContainer: {
    top: 150,
  },
  innerText: {
    color: '#FFF9C3',
    fontSize: 35,
    paddingLeft: 20,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 200,
  },
  exImage: {
    width: 150,
    height: 150,
    margin: 10
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    top: 440,
  },
})