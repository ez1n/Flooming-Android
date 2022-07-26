import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';
import Button from './button';

export default function Guide({ navigation }) {
  const handleClickButton = () => {
    navigation.navigate('ImageCheck');
  };

  return (
    <ImageBackground
      source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>
      <View style={styles.exampleImageContainer}>
        <View style={{ alignItems: 'center' }}>
          {/* 예시 사진 수정 */}
          <Image style={styles.img} source={require('../assets/images/imageEx.jpg')} />
          <Text style={styles.text}>이렇게 찍어주세요</Text>
          <Image source={require('../assets/yesIcon.png')} style={styles.icon} />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Image style={styles.img} source={require('../assets/images/imageNonEx.jpg')} />
          <Text style={styles.text}>이러면 그릴 수 없어요</Text>
          <Image source={require('../assets/noIcon.png')} style={styles.icon} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button text={'이해했어요'} onPress={handleClickButton} />
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFCFC',
  },
  exampleImageContainer: {
    flex: 0.85,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 190,
    height: 190,
    margin: 5,
    borderRadius: 20,
  },
  text: {
    marginTop: 20,
    color: '#FCFCFC',
    fontSize: 27,
    fontFamily: 'symkyungha',
  },
  icon: {
    marginTop: 50,
    borderRadius: 100,
    width: 45, 
    height: 45,
  },
  buttonContainer: {
    flex: 0.15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})