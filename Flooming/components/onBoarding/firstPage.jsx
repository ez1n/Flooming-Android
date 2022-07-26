import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import OnboardingButton from './onboardingButton';

export default function FirstPage(props) {
  return (
      <ImageBackground
        source={require('../../assets/images/loadingBackground.jpg')}
        style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>FLOOMING</Text>
        </View>

        <View style={styles.footer}>
          <OnboardingButton
          LeftLabel={'건너뛰기'}
          RightLabel={'다음'}
          handleBack={props.handleBack}
          handleNext={props.handleNext} />
        </View>
      </ImageBackground>
  )
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 0.95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FCFCFC',
    fontSize: 30,
    fontFamily: 'symkyungha',
  },
  footer: {
    flex: 0.05,
    width: '100%',
  },
})