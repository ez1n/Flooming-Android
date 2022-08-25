import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from './button';
import Error from './error';
import ServerError from './serverError';

export default function Main(props) {
  // 서버 연결 확인 state
  const [onServer, setOnServer] = useState(true);

  useEffect(() => {
    // 네트워크 연결 확인
    props.unsubscribe;

    // 서버 연결 확인
    axios.get(`${props.url}/`)
      .then(response => { setOnServer(true) })
      .catch(error => { setOnServer(false) })
  }, []);

  // 버튼 클릭 이벤트
  const handleClickButton = (path) => { props.navigation.navigate(path) };

  if (!onServer) {
    return <ServerError navigation={props.navigation} message={'현재 서비스를 이용할 수 없어요'} />
  } else if (!props.unsubscribe) {
    return <Error navigation={props.navigation} message={'Network Error'} />
  } else {
    return (
      <ImageBackground
        source={require('../assets/images/mainBackground.jpg')}
        style={styles.backgroundImage}
        imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>

        <View style={styles.textContainer}>
          <Text style={styles.innerText}><Text style={{ fontWeight: 'bold', fontSize: 25 }}>FLOOMING</Text>은 마음에 드는 </Text>
          <Text style={styles.innerText}><Text style={{ fontWeight: 'bold', fontSize: 25 }}>꽃사진</Text>을 <Text style={{ fontWeight: 'bold', fontSize: 25 }}>그림</Text>으로 만들어줘요.</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <View style={styles.imageSize}>
              <Image style={styles.exImage} source={require('../assets/images/mainPhoto.jpg')}></Image>
            </View>
            <FontAwesome name='arrow-right' size={24} color='#FFF9C3' />
            <View style={styles.imageSize}>
              <Image style={styles.exImage} source={require('../assets/images/illustrationimageEx.jpg')}></Image>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button text={'관람할래요'} onPress={() => handleClickButton('Gallery')} />
          <Button text={'지금 해볼래요'} onPress={() => handleClickButton('Guide')} />
        </View>
      </ImageBackground >
    )
  }
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  textContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  innerText: {
    color: '#FFF9C3',
    fontSize: 20,
    paddingLeft: 40,
    marginBottom: 10,
    fontFamily: 'symkyungha',
  },
  container: {
    flex: 0.4,
    paddingTop: 10,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSize: {
    width: '40%',
    height: '70%',
    margin: 10,
    borderRadius: 20,
    borderColor: '#FCFCFC',
    borderWidth: 3
  },
  exImage: {
    borderRadius: 15,
    borderColor: '#FCFCFC',
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})