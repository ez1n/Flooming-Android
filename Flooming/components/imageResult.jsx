import React, { useEffect, useRef, useState } from 'react';
import ViewShot, { captureRef } from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import axios from 'axios';
import { StyleSheet, ImageBackground, View, Image, TextInput, PermissionsAndroid, Platform,   } from 'react-native';
import Button from './button';

const ImageResult = (props) => {
  const viewRef = useRef();

  // 갤러리에 들어가야할 데이터
  const [data, setData] = useState(
    {
      photo_id: props.galleryData.photo_id,
      picture_id: props.galleryData.picture_id,
      comment: '',
    }
  );

  useEffect(() => {
    console.log(data);
  },[])

  // comment 입력 이벤트
  const getComment = (event) => {
      const {eventCount, target, text} = event.nativeEvent;
      setData({ ...data, comment: text });
      console.log(data);
  };

  // 갤러리 전시 이벤트
  const handleClickGallery = () => { 
    axios.post(`${props.url}/gallery`, data)
    .then((response) => {
      props.getLoadData(response.data.result);
      props.navigation.navigate('Gallery');
    })
    .catch((error) => console.log(error))
  };

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  return (
    <ImageBackground 
    source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>

      <View style={styles.illustContainer}>
        <ViewShot ref={viewRef}>
          <Image style={styles.illust} source={{ uri: `${props.url}/picture/${props.galleryData.picture_id}` }} />
        </ViewShot>
        
        <TextInput
          style={styles.illustText}
          placeholder='남기고 싶은 말이 있나요?'
          placeholderTextColor='#FCFCFC'
          onChange={getComment}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button text={'전시 할래요'} onPress={handleClickGallery} />
        <Button text={'저장 할게요'} onPress={props.handleSave} />
      </View>
    </ImageBackground>
  )
};

export default ImageResult;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FCFCFC',
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
    borderRadius: 20,
  },
  illustText: {
    color: '#FCFCFC',
    fontSize: 25,
    fontFamily: 'symkyungha',
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})