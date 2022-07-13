import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, TextInput } from 'react-native';
import Button from './button';

const ImageResult = ({ navigation }) => {
  // 갤러리 업로드 이벤트
  const handleClickGallery = () => { navigation.navigate('Gallery') };

  // 사진 저장 이벤트
  const handleClickSave = () => {
    //
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={require('../assets/images/mainBackground.jpg')}>

      <View style={styles.illustContainer}>
        <Image style={styles.illust} source={require('../assets/images/illustrationimageEx.jpg')} />
        <TextInput
          style={styles.illustText}
          placeholder='남기고 싶은 말이 있나요?'
          placeholderTextColor="#FCFCFC"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button text={'전시 할래요'} onPress={handleClickGallery} />
        <Button text={'저장 할게요'} onPress={handleClickSave} />
      </View>
    </ImageBackground>
  )
};

export default ImageResult;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  illustContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illust: {
    width: 320,
    height: 320,
    marginBottom: 15,
  },
  illustText: {
    color: '#FCFCFC',
    fontSize: 25,
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})