import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from './button';
import Error from './error';

export default function Main(props) {
  const handleClickButton = (path) => { props.navigation.navigate(path) }; // 버튼 클릭 이벤트

  // 네트워크 연결 확인
  useEffect(() => {
    props.unsubscribe;
  }, []);

  if (!props.unsubscribe) {
    return <Error navigation={props.navigation} message={'Network Error'} />
  } else {
    return (
      <ImageBackground
        source={require('../assets/images/mainBackground.jpg')}
        style={styles.backgroundImage}
        imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>

        <View style={styles.textContainer}>
          <Text style={styles.innerText}><Text style={{ fontWeight: 'bold', fontSize: 35 }}>FLOOMING</Text>은 마음에 드는 </Text>
          <Text style={styles.innerText}><Text style={{ fontWeight: 'bold', fontSize: 35 }}>꽃사진</Text>을 <Text style={{ fontWeight: 'bold', fontSize: 35 }}>그림</Text>으로 만들어줘요.</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.exImage} source={require('../assets/images/mainPhoto.jpg')}></Image>
            <FontAwesome name='arrow-right' size={24} color='#FFF9C3' />
            <Image style={styles.exImage} source={require('../assets/images/illustrationimageEx.jpg')}></Image>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button text={'관람할래요'} onPress={() => handleClickButton('Gallery')} />
          <Button text={'지금 해볼래요'} onPress={() => handleClickButton('Guide')} />
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
  textContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
  },
  innerText: {
    color: '#FFF9C3',
    fontSize: 30,
    paddingLeft: 40,
    marginBottom: 10,
    fontFamily: 'symkyungha',
  },
  container: {
    flex: 0.45,
    paddingTop: 10,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exImage: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 20,
    borderColor: '#FCFCFC',
    borderWidth: 3,
  },
  buttonContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})