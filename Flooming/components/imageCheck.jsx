import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity } from 'react-native';
import Button from './button';

const ImageCheck = (props) => {
  const [image, setImage] = useState(null);
  const [galleryPermission, setGalleryPermission] = ImagePicker.useMediaLibraryPermissions();
  const [photoPermission, setPhotoPermission] = ImagePicker.useCameraPermissions();


  const PressGalleryButton = async() => {
    // 접근 권한 허용 여부
    if (!galleryPermission?.granted) {
      const permission = await setGalleryPermission();
      if(!permission.granted) {
        return null;
      }
    };

    // 이미지 가져오기 (갤러리)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const PressPhotoButton = async() => {
    // 접근 권한 허용 여부
    if (!photoPermission?.granted) {
      const permission = await setPhotoPermission();
      if(!permission.granted) {
        return null;z
      }
    };

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.titleContainer}></View>
      
      <View style={styles.imageContainer}>
        { image ? <Image style={styles.exImage} source={{uri: image}} /> : <Image style={styles.exImage} source={require('../assets/images/imageEx.jpg')} />}

        <View style={styles.imageButtonContainer}>
          <TouchableOpacity>
            <Text style={styles.buttonText} onPress={PressPhotoButton}>사진 찍기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText} onPress={PressGalleryButton}>앨범에서 가져오기</Text>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  exImage: {
    width: 300,
    height: 300,
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
    bottom: 10,
  },
})