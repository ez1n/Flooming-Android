import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Image, ImageBackground, View, Text } from 'react-native';
import Button from './button';
import Loading from './loading';
import AlertModal from './alertModal';

const ClassResult = (props) => {
  // error 상태 state
  const [onError, setOnError] = useState(false);
  // error message state
  const [errorMessage, setErrorMessage] = useState(null);
  // 서버에 요청할 데이터 state
  const currentImageType = {
    photo_id: props.flowerData.photo_id,
  };
  // 로딩 state
  const [loading, setLoading] = useState(null);

  // 네트워크 연결 확인
  useEffect(() => {
    props.unsubscribe;
  }, []);

  // 그림 그리기 이벤트
  const handleDrawImage = async () => {
    setLoading(true);
    try {
      axios.post(`${props.url}/picture`, currentImageType)
        .then((response) => {
          props.navigation.navigate('ImageResult');
          props.updateGalleryData(response.data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setOnError(!onError);
          setErrorMessage(error.response.data.detail);
        })
    } catch (error) {
      console.warn(error);
    }
  };

  // 뒤로가기 이벤트 (modal close)
  const handleGoBack = () => { setOnError(!onError) };

  if (!props.unsubscribe) {
    return <Error navigation={props.navigation} message={'Network Error'} />
  }
  if (loading) {
    return (<Loading navigation={props.navigation} />)
  }
  return (
    <ImageBackground
      source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>

      {/* error message */}
      <AlertModal
        handleGoBack={handleGoBack}
        onVisible={onError}
        comment={'그림 다시 그리기'}
        message={errorMessage} />

      <View style={styles.imageContainer}>
        <Text style={styles.myImageText}>당신이 찍은 꽃</Text>
        <View style={styles.myImageSize}>
          <Image style={styles.myImage} source={{ uri: props.currentImage }} />
        </View>

        <Image style={styles.resultImage} source={{ uri: `${props.url}/flower/${props.flowerData.kor_name}` }} />
        <Text style={[styles.flowerData, styles.flowerName]}>{props.flowerData.kor_name} ({props.flowerData.eng_name})</Text>
        <Text style={[styles.flowerData, styles.flowerLanguage]}>'{props.flowerData.flower_language}'</Text>
        <Text style={[styles.flowerData, styles.flowerProbability]}>{props.flowerData.probability}%</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button text={'그림을 그려볼까요?'} onPress={handleDrawImage} />
      </View>
    </ImageBackground >
  )
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
  myImageText: {
    color: '#FCFCFC',
    fontSize: 20,
    fontFamily: 'symkyungha',
  },
  myImageSize: {
    width: '50%',
    height: '30%',
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 20,
  },
  myImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
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
    fontSize: 18,
  },
  flowerLanguage: {
    fontSize: 15,
  },
  flowerProbability: {
    fontSize: 12,
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})