import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Main from './components/main';
import Guide from './components/guide';
import ImageCheck from './components/imageCheck';
import ClassResult from './components/classResult';
import ImageResult from './components/imageResult';
import Gallery from './components/gallery/gallery';

// 네비게이터
Stack = createNativeStackNavigator();

export default function App() {
  const [image, setImage] = useState(null); // 현재 이미지 데이터 state
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
  // 갤러리 정보 state
  const [galleryData, setGalleryData] = useState({
    photo_id: null,
    picture_id: null,
    picture_src: null,
  });
  // 갤러리 로딩 데이터 state (받아오기)
  const [loadData, setLoadData] = useState({
    photo_src: null,
    picture_src: null,
    comment: null,
  });

  // 현재 이미지 데이터 가져오기
  const getImage = (data) => { setImage(data) };

  // 꽃 정보 업데이트
  const updateFlowerData = (data) => { setFlowerData({ data }) };

  // 갤러리 정보 업데이트
  const updateGalleryData = (data) => { setGalleryData(data) };

  // 갤러리 로딩 정보 가져오기
  const getLoadDAta = (data) => { setLoadData(data) };

  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Stack.Navigator initialRootName='Main'>

        <Stack.Screen
          name='Main'
          component={Main}
          options={{ title: 'FLOOMING' }}
        />

        <Stack.Screen
          name='Guide'
          component={Guide}
          options={{ title: '사진 가이드' }}
        />

        <Stack.Screen
          name='ImageCheck'
          children={({ navigation }) => <ImageCheck
            updateFlowerData={updateFlowerData}
            navigation={navigation}
            getImage={getImage}
            image={image}
          />}
          options={{ title: '' }}
        />

        <Stack.Screen
          name='ClassResult'
          children={(({ navigation }) => <ClassResult
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
            galleryData={galleryData}
            getLoadDAta={getLoadDAta}
            navigation={navigation} 
            />)}
          options={{ title: '그림 결과' }}
        />

        <Stack.Screen
          name='Gallery'
          children={(({navigation}) => <Gallery
          loadData={loadData}
          navigation={navigation} 
          />)}
          options={{ title: '갤러리' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
