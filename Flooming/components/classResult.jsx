import React, { useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Image, ImageBackground, View, Text, TouchableOpacity, Modal } from 'react-native';
import Button from './button';

const ClassResult = (props) => {
  // 서버에 요청할 데이터 state
  const currentImageType = {
    photo_id: props.flowerData.photo_id,
  };

  // 네트워크 연결 확인
  useEffect(() => {
    props.unsubscribe;
  }, []);

  // 그림 그리기 이벤트
  const handleDrawImage = () => {
    axios.post(`${props.url}/picture`, currentImageType)
      .then((response) => {
        props.navigation.navigate('ImageResult');
        props.updateGalleryData(response.data);
      })
      .catch((error) => console.log(error))
  };

  if (!props.unsubscribe) {
    return <Error navigation={props.navigation} message={'Network Error'} />
  } else {
    return (
      <ImageBackground
        source={require('../assets/images/mainBackground.jpg')}
        style={styles.backgroundImage}
        imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>

        <View style={styles.imageContainer}>

          <View style={styles.myImageContainer}>
            <Text style={styles.myImageText}>당신의 꽃</Text>
            <Image style={styles.myImage} source={{ uri: props.currentImage }} />
          </View>

          <View style={styles.resultImageContainer}>
            <Image style={styles.resultImage} source={{ uri: `${props.url}/flower/${props.flowerData.kor_name}` }} />
            <Text style={[styles.flowerData, styles.flowerName]}>{props.flowerData.kor_name} ({props.flowerData.eng_name})</Text>
            <Text style={[styles.flowerData, styles.flowerLanguage]}>'{props.flowerData.flower_language}'</Text>
            <Text style={[styles.flowerData, styles.flowerProbability]}>{props.flowerData.probability}%</Text>
          </View>

        </View>

        <View style={styles.buttonContainer}>
          <Button text={'그림을 그려볼까요?'} onPress={handleDrawImage} />
        </View>
      </ImageBackground >
    )
  }
};

export default ClassResult;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  imageContainer: {
    flex: 0.9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myImageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myImageText: {
    color: '#FCFCFC',
    fontSize: 30,
    fontFamily: 'symkyungha',
  },
  myImage: {
    width: 180,
    height: 180,
    marginTop: 15,
    borderRadius: 20,
  },
  resultImageContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 20,
  },
  flowerData: {
    color: '#FCFCFC',
    marginBottom: 10,
    fontFamily: 'symkyungha',
  },
  flowerName: {
    fontSize: 26,
  },
  flowerLanguage: {
    fontSize: 22,
  },
  flowerProbability: {
    fontSize: 15,
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})