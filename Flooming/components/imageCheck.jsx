import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, ImageBackground, View, Image, TouchableOpacity } from 'react-native';
import Button from './button';
import AlertModal from './alertModal';
import ExtraButton from './extraButton';

export default function ImageCheck(props) {
  const [onError, setOnError] = useState(false); // error 상태 state
  const [errorMessage, setErrorMessage] = useState(null); // error message
  const imageData = new FormData(); // 사진 전송 폼

  // 네트워크 연결 확인
  useEffect(() => {
    props.unsubscribe;
  }, []);

  // 앨범에서 가져오기 이벤트
  const handleClickGalleryButton = async () => {
    // 이미지 가져오기 (갤러리)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1
    });

    if (!result.cancelled) {
      props.getImage(result.uri);
    };
  };

  // 사진 촬영 이벤트
  const handleClickPhotoButton = async () => {
    // 사진 촬영
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1
    });

    if (!result.cancelled) {
      props.getImage(result.uri);
    }
  };

  // 이미지 전송 이벤트 (버튼 클릭)
  const handleClickSelectButton = () => {
    if (props.image == null) {  // 사진이 없는 경우
      setOnError(!onError);
      setErrorMessage('사진을 선택해 주세요!');
    } else { // 사진이 있는 경우
      const filename = props.image.split('/').pop();
      imageData.append('file', { uri: props.image, type: 'multipart/form-data', name: filename });

      axios.post(`${props.url}/photo`, imageData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          props.updateFlowerData(response.data);
          props.navigation.navigate('ClassResult');
        })
        .catch((error) => {
          console.log(error.response);
          setOnError(!onError);

          if (error.response.data.detail == undefined) {
            setErrorMessage('사진을 다시 찍어주세요!');
          } else {
            setErrorMessage(error.response.data.detail);
          };
        })
    }
  };

  // 뒤로가기 이벤트
  const handleGoBack = () => { setOnError(!onError) };

  if (!props.unsubscribe) {
    return <Error navigation={props.navigation} message={'Network Error'} />
  } else {
    return (
      <ImageBackground
        source={require('../assets/images/mainBackground.jpg')}
        style={styles.backgroundImage}
        imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>

        {/* error message */}
        <AlertModal
          handleGoBack={handleGoBack}
          onVisible={onError}
          comment={'사진 다시 찍기'}
          message={errorMessage} />

        <View style={styles.imageContainer}>
          {/* 받아온 꽃 사진 */}
          <View style={styles.imageSize}>
            {props.image ? <Image style={styles.exImage} source={{ uri: props.image }} /> : <Image style={styles.exImage} source={require('../assets/images/exampleImage.jpg')} />}
          </View>

          <View style={styles.imageButtonContainer}>
            <TouchableOpacity style={styles.button}>
              <ExtraButton text={'사진 찍기'} onPress={handleClickPhotoButton} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <ExtraButton text={'앨범에서 가져오기'} onPress={handleClickGalleryButton} />
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.buttonContainer}>
          <Button text={'사진 선택'} onPress={handleClickSelectButton} />
        </View>
      </ImageBackground>
    )
  }
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  imageContainer: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSize: {
    width: '90%',
    height: '55%',
    borderRadius: 20,
  },
  exImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  imageButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    width: '40%'
  }
})