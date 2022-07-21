import React, { useEffect, useState } from 'react';
import Flooming from './flooming';
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
  const flooming = new Flooming(); // url
  const [image, setImage] = useState(null); // 현재 사진 state (나의 사진)
  const [photoId, setPhotoId] = useState(null); // photo_id state
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
      photo_src: null,
      picture_src: null,
      comment: null,
    },
  ]);

  // 폰트 로딩 => 로딩화면 띄우기
  useEffect(() => {
    Font.loadAsync({
      'symkyungha': require('./assets/fonts/SimKyungha.ttf'),
    });
  }, []);

  const getImage = (data) => { setImage(data) }; // 현재 이미지 데이터 가져오기
  const updateFlowerData = (data) => { setFlowerData(data) }; // 꽃 정보 업데이트
  const updatePhotoId = (data) => { setPhotoId(data) }; // photo_id 업데이트
  const updateGalleryData = (data) => { setGalleryData(data) }; // 갤러리 정보 업데이트
  const getLoadData = (data) => { setLoadData({ data }) }; // 갤러리 로딩 정보 가져오기

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
            updatePhotoId={updatePhotoId}
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
            photoId={photoId}
            updateGalleryData={updateGalleryData}
            navigation={navigation}
          />)}
          options={{ title: '분류 결과' }}
        />

        <Stack.Screen
          name='ImageResult'
          children={(({ navigation }) => <ImageResult
            url={flooming.url()}
            getImage={getImage} // 현재 이미지 초기화 시킬까말까 -> 뒤로가기했을때 정보 남아있어야하나?
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
            navigation={navigation}
          />)}
          options={{ title: '전시관' }}
        />

      </Stack.Navigator>
    </NavigationContainer >
  )
}
