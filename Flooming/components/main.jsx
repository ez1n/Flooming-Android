import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from './button';

export default function Main(props) {
  const handleClickButton = () => { props.navigation.navigate('Guide') }; // 버튼 클릭 이벤트

  return (
    <ImageBackground
      source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>

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
        <Button text={'지금 해볼래요'} onPress={handleClickButton} />
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  textContainer: {
    flex: 0.35,
    justifyContent: 'flex-end',
  },
  innerText: {
    color: '#FFF9C3',
    fontSize: 40,
    paddingLeft: 40,
    fontFamily: 'symkyungha',
  },
  imageContainer: {
    flex: 0.3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  exImage: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 20,
  },
  buttonContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})