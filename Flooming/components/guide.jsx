import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';
import Button from './button';

export default function Guide(props) {
  // 네트워크 연결 확인
  useEffect(() => {
    props.unsubscribe;
  }, []);

  const handleClickButton = () => {
    props.navigation.navigate('ImageCheck');
  };

  if (!props.unsubscribe) {
    return <Error navigation={props.navigation} message={'Network Error'} />
  } else {
    return (
      <ImageBackground
        source={require('../assets/images/mainBackground.jpg')}
        style={styles.backgroundImage}
        imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>
        <View style={styles.exampleImageContainer}>
          <View style={{ alignItems: 'center', flex: 0.5 }}>
            {/* 예시 사진 수정 */}
            <View style={styles.imageSize}>
              <Image style={styles.img} source={require('../assets/images/mainPhoto.jpg')} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>꽃이 잘 보이게 찍어주세요</Text>
            </View>

            <Image source={require('../assets/yesIcon.png')} style={styles.icon} />

          </View>

          <View style={{ alignItems: 'center', flex: 0.5 }}>
            <View style={styles.imageSize}>
              <Image style={styles.img} source={require('../assets/images/imageNonEx.jpg')} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>불분명한 사진은 </Text>
              <Text style={styles.noText}>그림을 그릴 수 없어요</Text>
            </View>
            <Image source={require('../assets/noIcon.png')} style={styles.icon} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button text={'이해했어요'} onPress={handleClickButton} />
        </View>
      </ImageBackground>
    )
  }
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#140855',
  },
  exampleImageContainer: {
    flex: 0.85,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSize: {
    width: '85%',
    height: '28%',
    margin: 5,
    borderRadius: 20,
    borderColor: '#FCFCFC',
    borderWidth: 3,
  },
  img: {
    borderRadius: 18,
    borderWidth: 3,
    width: '100%',
    height: '100%',
  },
  textContainer: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: 20,
    color: '#FCFCFC',
    fontSize: 13,
    fontFamily: 'symkyungha',
  },
  noText: {
    color: '#FCFCFC',
    fontSize: 13,
    fontFamily: 'symkyungha',
  },
  icon: {
    marginTop: 50,
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  buttonContainer: {
    flex: 0.15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})