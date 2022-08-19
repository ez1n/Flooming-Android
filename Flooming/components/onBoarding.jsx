import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function onBoarding(props) {
  const navigation = useNavigation();

  const handleSkip = () => { navigation.replace('Main') };

  const slides = [
    {
      key: 1,
      title: '이 꽃은 무슨 꽃일까?',
      text: '길거리에 피어있는\n꽃의 이름과 꽃말을 알아봐요.',
      image: require('../assets/images/onboarding_1.png'),
    },
    {
      key: 2,
      title: '꽃을 그림으로 간직하고 싶은 당신',
      text: 'FLOOMING에서 원하는 꽃 사진을\n선택해 나만의 그림으로 바꿔봐요.',
      image: require('../assets/images/onboarding_2.png'),
    },
    {
      key: 3,
      title: '다른 그림을 보고 싶나요?',
      text: '다양한 사용자들의 꽃 사진과 그림을\n 관람할 수 있어요.',
      image: require('../assets/images/onboarding_3.png'),
    }
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.Container}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.text}</Text>
      </View>
    )
  };

  const nextButton = () => {
    return (
      <View>
        <Text style={styles.button}>다음</Text>
      </View>
    )
  };

  const prevButton = () => {
    return (
      <View>
        <Text style={styles.button}>이전</Text>
      </View>
    )
  };

  const skipButton = () => {
    return (
      <View>
        <Text style={styles.button}>SKIP</Text>
      </View>
    )
  };

  const doneButton = () => {
    return (
      <View>
        <Text style={styles.button}>시작하기</Text>
      </View>
    )
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={handleSkip}
      onSkip={handleSkip}
      renderSkipButton={skipButton}
      renderNextButton={nextButton}
      renderPrevButton={prevButton}
      renderDoneButton={doneButton}
      showPrevButton={true}
      showSkipButton={true}
      dotStyle={{ backgroundColor: '#D5CBF3' }}
      activeDotStyle={{ backgroundColor: 'purple' }}
    />
  )
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    flex: 0.5,
    width: '100%',
  },
  title: {
    fontFamily: 'symkyungha',
    fontSize: 23,
    margin: 20
  },
  description: {
    fontFamily: 'symkyungha',
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    color: 'black',
    fontSize: 15
  }
});