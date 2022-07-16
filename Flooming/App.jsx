import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Main from './components/main';
import Guide from './components/guide';
import ImageCheck from './components/imageCheck';
import ClassResult from './components/classResult';
import ImageResult from './components/imageResult';
import Gallery from './components/gallery/gallery';

const Stack = createNativeStackNavigator(); // 네비게이터

export default function App() {
  useEffect(() => {
    Font.loadAsync({
      'symkyungha': require('./assets/fonts/SimKyungha.ttf'),
    });
  }, [])

  // 현재 사진 state (당신이 찍은 꽃)
  const [image, setImage] = useState(null);
  // 꽃 정보 state
  const [flowerData, setFlowerData] = useState([
    {
      img_src: null,
      kor_name: null,
      eng_name: null,
      flower_language: null,
      probability: null,
    },
  ]);
  // photo_id
  const [photoId, setPhotoId] = useState(null);
  // 갤러리 정보 state
  const [galleryData, setGalleryData] = useState({
    photo_id: null,
    picture_id: null,
    picture_src: null,
  });
  // 갤러리 로딩 데이터 state (페이징)
  const [loadData, setLoadData] = useState([
    {
      photo_src: null,
      picture_src: null,
      comment: null,
    },
  ]);

  const getImage = (data) => { setImage(data) }; // 현재 이미지 데이터 가져오기
  const updateFlowerData = (data) => { setFlowerData({ data }) }; // 꽃 정보 업데이트
  const updatePhotoId = (data) => { setPhotoId(data) }; // photo_id 업데이트
  const updateGalleryData = (data) => { setGalleryData(data) }; // 갤러리 정보 업데이트
  const getLoadData = (data) => { setLoadData({ data }) }; // 갤러리 로딩 정보 가져오기

  return (
    <NavigationContainer>
      <StatusBar style='auto' />
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
            image={image}
            updateFlowerData={updateFlowerData}
            updatePhotoId={updatePhotoId}
            getImage={getImage}
            navigation={navigation}
          />}
          options={{ title: '' }}
        />

        <Stack.Screen
          name='ClassResult'
          children={(({ navigation }) => <ClassResult
            flowerData={flowerData}
            currentImage={image}
            photoId={photoId}
            updateGalleryData={updateGalleryData}
            navigation={navigation}
          />)}
          options={{ title: '분류 결과' }}
        />

        <Stack.Screen
          name='ImageResult'
          children={(({ navigation }) => <ImageResult
            galleryData={galleryData}
            getLoadData={getLoadData}
            navigation={navigation}
          />)}
          options={{ title: '그림 결과' }}
        />

        <Stack.Screen
          name='Gallery'
          children={(({ navigation }) => <Gallery
            loadData={loadData}
            navigation={navigation}
          />)}
          options={{ title: '갤러리' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
