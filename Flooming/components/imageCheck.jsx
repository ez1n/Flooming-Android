import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, ImageBackground, Text, View, Image, TouchableOpacity } from 'react-native';
import Button from './button';

export default function ImageCheck(props) {
  const [galleryPermission, setGalleryPermission] = ImagePicker.useMediaLibraryPermissions();  // 갤러리 접근 권한
  const [photoPermission, setPhotoPermission] = ImagePicker.useCameraPermissions(); // 카메라 접근 권한
  const imageData = new FormData(); // 사진 전송 폼

  // 앨범에서 가져오기 이벤트
  const handleClickGalleryButton = async() => {
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
      props.getImage(result.uri);
    }
  };

  // 사진 찍기 이벤트
  const handleClickPhotoButton = async() => {
    // 접근 권한 허용 여부
    if (!photoPermission?.granted) {
      const permission = await setPhotoPermission();
      if(!permission.granted) {
        return null;
      }
    };

    // 사진 촬영
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      props.getImage(result.uri);
      imageData.append('file', props.image);
    }
  };

    // 이미지 전송 이벤트 (버튼 클릭)
    const handleClickSelectButton = () => {
      const filename = props.image.split('/').pop();
      imageData.append('file', {uri: props.image, type: 'multipart/form-data', name: filename});

      // http://flooming.link
      axios.post('https://38e3-183-99-247-44.jp.ngrok.io/photo', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          console.log(response.data);
          props.updateFlowerData(response.data);
          props.updatePhotoId(Number(response.data.photo_id));
          props.navigation.navigate('ClassResult');
        })
        .catch((error) => { console.log(error) })
    };

  return (
    <ImageBackground
      source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>
      
      <View style={styles.imageContainer}>
        {/* 받아온 꽃 사진 */}
        { props.image ? <Image style={styles.exImage} source={{uri: props.image}} /> : <Image style={styles.exImage} source={require('../assets/images/imageEx.jpg')} />}

        <View style={styles.imageButtonContainer}>
          <TouchableOpacity>
            <Text style={styles.buttonText} onPress={handleClickPhotoButton}>사진 찍기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText} onPress={handleClickGalleryButton}>앨범에서 가져오기</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.buttonContainer}>
        <Button text={'사진 선택'} onPress={handleClickSelectButton} />
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
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
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center'
  },
  exImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  imageButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    color: '#FCFCFC',
    fontSize: 30,
    fontFamily: 'symkyungha',
  },
  buttonContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})