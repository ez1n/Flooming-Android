import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Button from './button';

export default function Guide({navigation}) {
  const handleClickButton = () => {
    navigation.navigate('ImageCheck');
  };

  return (
    <ImageBackground
      source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.exampleImageContainer}>
        <View style={{ alignItems: 'center' }}>
          {/* 예시 사진 수정 */}
          <Image style={styles.img} source={require('../assets/images/imageEx.jpg')} />
          <Text style={styles.text}>이렇게 찍어주세요</Text>
          <AntDesign style={styles.icon} name="checkcircle" size={40} color="blue" />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Image style={styles.img} source={require('../assets/images/imageNonEx.jpg')} />
          <Text style={styles.text}>이러면 그릴 수 없어요</Text>
          <AntDesign style={styles.icon} name="closecircle" size={40} color="red" />
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
    position: 'relative',
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
  },
  buttonContainer: {
    flex: 0.15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})