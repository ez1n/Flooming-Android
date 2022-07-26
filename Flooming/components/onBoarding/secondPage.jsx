import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import OnboardingButton from './onboardingButton';

export default function SecondPage(props) {
  return (
    <ImageBackground
      source={require('../../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.9 }}>

      <View style={styles.container}>
        <Text style={styles.innerText}>마음에 드는 <Text style={{ fontWeight: 'bold' }}>꽃</Text>을</Text>
        <Text style={styles.innerText}><Text style={{ fontWeight: 'bold' }}>그림</Text>으로 바꿔봐요.</Text>

        <View style={styles.imageContainer}>
          <Image style={styles.exImage} source={require('../../assets/images/imageEx.jpg')}></Image>
          <FontAwesome name='arrow-right' size={24} color='#FFF9C3' />
          <Image style={styles.exImage} source={require('../../assets/images/illustrationimageEx.jpg')}></Image>
        </View>
      </View>

      <View style={styles.footer}>
        <OnboardingButton
        LeftLabel={'이전'}
        RightLabel={'다음'}
        handleBack={props.handleBack}
        handleNext={props.handleNext} />
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'center',
  },
  container: {
    flex: 0.95,
    justifyContent: 'center',
  },
  innerText: {
    color: '#FFF9C3',
    fontSize: 40,
    paddingLeft: 40,
    fontFamily: 'symkyungha',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,

  },
  exImage: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 20,
  },
  footer: {
    flex: 0.05,
    width: '100%',
  },
})