import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default function Main(props) {

  useEffect(() => {
    props.setText('지금 해볼래요');
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>FLOOMING</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.innerText}>마음에 드는 <Text style={{ fontWeight: 'bold' }}>꽃</Text>을</Text>
        <Text style={styles.innerText}><Text style={{ fontWeight: 'bold' }}>그림</Text>으로 바꿔봐요.</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image style={styles.img} source={require('../assets/images/imageEx.jpg')}></Image>
        <FontAwesome name='arrow-right' size={24} color='#FFF9C3' />
        <Image style={styles.img} source={require('../assets/images/illustrationimageEx.jpg')}></Image>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFCFC',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textContainer: {
    top: 150,
  },
  innerText: {
    color: '#FFF9C3',
    fontSize: 35,
    paddingLeft: 20,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 200,
  },
  img: {
    width: 150,
    height: 150,
    margin: 10
  },
})