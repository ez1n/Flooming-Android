import React, { useState } from 'react';
import Flooming from './flooming';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import Main from './components/main';
import Guide from './components/guide';
import ImageCheck from './components/imageCheck';
import ClassResult from './components/classResult';
import ImageResult from './components/imageResult';
import Gallery from './components/gallery/gallery';
import MainLoading from './components/mainLoading';
import Error from './components/error';
import Loading from './components/loading';

const Stack = createNativeStackNavigator(); // 네비게이터

export default function App() {
  const flooming = new Flooming(); // url
  const [onLoaded, setOnLoaded] = useState(false); // 앱 로딩 state
  const [image, setImage] = useState(null); // 현재 사진 state (나의 사진)
  // 꽃 정보 state
  const [flowerData, setFlowerData] = useState([
    {
      kor_name: null,
      eng_name: null,
      flower_language: null,
      probability: null,
    },
  ]);
  // 갤러리 정보 state
  const [galleryData, setGalleryData] = useState({
    photo_id: null,
    picture_id: null,
    picture_src: null,
  });
  // 갤러리 로딩 데이터 state (페이징)
  const [loadData, setLoadData] = useState([
    {
      photo_id: null,
      picture_id: null,
      comment: null,
    },
  ]);

  const getImage = (data) => { setImage(data) }; // 현재 이미지 데이터 가져오기
  const updateFlowerData = (data) => { setFlowerData(data) }; // 꽃 정보 업데이트
  const updateGalleryData = (data) => { setGalleryData(data) }; // 갤러리 정보 업데이트
  const getLoadData = (data) => { setLoadData({ data }) }; // 갤러리 로딩 정보 가져오기
  // 갤러리 로딩 정보 가져오기
  const updateLoadData = (data) => {
    for (let i = 0; i < data.length; i++) {
      const newData = [...loadData.data, data[i]];
      setLoadData(newData);
    }
  };
  // 폰트 로딩
  const onLoading = async () => {
    await Font.loadAsync({
      'symkyungha': require('./assets/fonts/SimKyungha.ttf'),
    });
  }
  // 로딩 state 변경
  const loaded = () => { setOnLoaded(true) };

  // 처음 로딩화면 어떻게 보여주지;
  if (!onLoaded) {
    return (
      <AppLoading
        startAsync={onLoading}
        onError={console.warn}
        onFinish={loaded}
      />
      // <Loading />
    )
  };

  // if(onLoaded) {
  //   return (
  //     <Loading />
  //   )
  // }

  return (
    <NavigationContainer>
      < StatusBar style='auto' />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FCFCFC' },
          headerTitleStyle: { fontFamily: 'symkyungha', fontSize: 30 }
        }}
        initialRootName='Main'>

        <Stack.Screen
          name='Main'
          component={Main}
          options={{ headerTitle: 'FLOOMING' }}
        />

        <Stack.Screen
          name='Guide'
          component={Guide}
          options={{ title: '사진 가이드' }}
        />

        <Stack.Screen
          name='ImageCheck'
          children={({ navigation }) => <ImageCheck
            url={flooming.url()}
            image={image}
            updateFlowerData={updateFlowerData}
            getImage={getImage}
            navigation={navigation}
          />}
          options={{ title: '' }}
        />

        <Stack.Screen
          name='ClassResult'
          children={(({ navigation }) => <ClassResult
            url={flooming.url()}
            flowerData={flowerData}
            currentImage={image}
            updateGalleryData={updateGalleryData}
            navigation={navigation}
          />)}
          options={{ title: '분류 결과' }}
        />

        <Stack.Screen
          name='ImageResult'
          children={(({ navigation }) => <ImageResult
            url={flooming.url()}
            galleryData={galleryData}
            getLoadData={getLoadData}
            navigation={navigation}
          />)}
          options={{ title: '그림 결과' }}
        />

        <Stack.Screen
          name='Gallery'
          children={(({ navigation }) => <Gallery
            url={flooming.url()}
            loadData={loadData}
            getLoadData={getLoadData}
            updateLoadData={updateLoadData}
            navigation={navigation}
          />)}
          options={{
            title: '전시관',
            headerRight: () => (
              <TouchableOpacity onPress={goHome}>
                <FontAwesome name='home' size={30} color='black' />
              </TouchableOpacity>
            )
          }}
        />

      </Stack.Navigator>
    </NavigationContainer >
  )
}
