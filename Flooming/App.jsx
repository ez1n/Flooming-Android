import React, { useEffect, useState } from 'react';
import Flooming from './flooming';
import * as ImagePicker from 'expo-image-picker';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/main';
import Guide from './components/guide';
import ImageCheck from './components/imageCheck';
import ClassResult from './components/classResult';
import ImageResult from './components/imageResult';
import Gallery from './components/gallery/gallery';
import OnBoarding from './components/onBoarding/onBoarding';

const Stack = createNativeStackNavigator(); // 네비게이터
SplashScreen.preventAutoHideAsync(); // Splash screen

const App = () => {
  const flooming = new Flooming(); // url
  const [galleryPermission, setGalleryPermission] = ImagePicker.useMediaLibraryPermissions();  // 갤러리 접근 권한
  const [photoPermission, setPhotoPermission] = ImagePicker.useCameraPermissions(); // 카메라 접근 권한
  const [onLoaded, setOnLoaded] = useState(false); // 앱 로딩 state
  const [firstLaunch, setFirstLaunch] = useState(null);
  const [image, setImage] = useState(null); // 현재 사진 state (나의 사진)
  // 꽃 정보 state
  const [flowerData, setFlowerData] = useState([
    { photo_id: '', probability: '', kor_name: '', eng_name: '', flower_language: '' },
  ]);
  // 갤러리 정보 state
  const [galleryData, setGalleryData] = useState({ photo_id: '', picture_id: '' });
  // 갤러리 로딩 데이터 state (페이징)
  const [loadData, setLoadData] = useState([
    { photo_id: '', picture_id: '', comment: '' },
  ]);

  useEffect(() => {
    const permissionCheck = async () => {
      // 갤러리 접근 권한 허용 여부
      if (!galleryPermission?.granted) {
        const permission = await setGalleryPermission();
        if (!permission.granted) {
          return null;
        }
      };

      // 카메라 접근 권한 허용 여부
      if (!photoPermission?.granted) {
        const permission = await setPhotoPermission();
        if (!permission.granted) {
          return null;
        }
      };
    }

    permissionCheck();

    // 어플 실행 여부 확인 (first launch?)
    AsyncStorage.getItem('launched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('launched', 'true');
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);

  // 인터넷 연결 확인
  const unsubscribe = () => NetInfo.addEventListener(state => {
    console.log(state.isConnected)
    return (state.isConnected);
  });

  const getImage = (data) => { setImage(data) }; // 현재 이미지 데이터 가져오기
  const updateFlowerData = (data) => { setFlowerData(data) }; // 꽃 정보 업데이트
  const updateGalleryData = (data) => { setGalleryData(data) }; // 갤러리 정보 업데이트
  const getLoadData = (data) => { setLoadData({ data }) }; // 갤러리 로딩 정보 가져오기
  // 갤러리 정보 추가하기
  const updateLoadData = (data) => {
    const newData = { data: [...loadData.data] };
    data.map(item => { newData.data.push(item) })
    setLoadData(newData);
  };

  // 폰트 로딩
  const onLoading = async () => {
    await Font.loadAsync({
      'symkyungha': require('./assets/fonts/SimKyungha.ttf'),
    });
  };

  // 로딩 state 변경
  const loaded = () => { setOnLoaded(true) };

  if (!onLoaded) {
    return (
      <AppLoading
        startAsync={onLoading}
        onError={console.warn}
        onFinish={loaded}
      />
    )
  };

  if (firstLaunch == null) {
    return null
  } else if (firstLaunch == true) { // 어플 실행이 처음인 경우 (onboarding)
    return (
      <NavigationContainer>
        <StatusBar style='auto' />

        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#FCFCFC' },
            headerTitleStyle: { fontFamily: 'symkyungha', fontSize: 30 }
          }}>

          <Stack.Screen
            name='Onboarding'
            children={() => <OnBoarding
            />}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Main'
            children={({ navigation }) => <Main
              unsubscribe={unsubscribe}
              navigation={navigation}
            />}
            options={{ headerTitle: 'FLOOMING' }}
          />

          <Stack.Screen
            name='Guide'
            children={({ navigation }) => <Guide
              unsubscribe={unsubscribe}
              navigation={navigation}
            />}
            options={{ title: '사진 가이드' }}
          />

          <Stack.Screen
            name='ImageCheck'
            children={({ navigation }) => <ImageCheck
              url={flooming.url()}
              image={image}
              flowerData={flowerData}
              unsubscribe={unsubscribe}
              updateFlowerData={updateFlowerData}
              getImage={getImage}
              navigation={navigation}
            />}
            options={{ title: '사진 선택' }}
          />

          <Stack.Screen
            name='ClassResult'
            children={(({ navigation }) => <ClassResult
              url={flooming.url()}
              flowerData={flowerData}
              currentImage={image}
              unsubscribe={unsubscribe}
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
              unsubscribe={unsubscribe}
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
              unsubscribe={unsubscribe}
              getImage={getImage}
              updateFlowerData={updateFlowerData}
              getLoadData={getLoadData}
              updateLoadData={updateLoadData}
              navigation={navigation}
            />)}
            options={{ title: '전시관' }}
          />

        </Stack.Navigator>
      </NavigationContainer >
    )
  } else { // 어플 실행이 처음이 아닌 경우 (no onboarding)
    return (
      <NavigationContainer>
        <StatusBar style='auto' />

        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#FCFCFC' },
            headerTitleStyle: { fontFamily: 'symkyungha', fontSize: 30 }
          }}>

          <Stack.Screen
            name='Main'
            children={({ navigation }) => <Main
              unsubscribe={unsubscribe}
              navigation={navigation}
            />}
            options={{ headerTitle: 'FLOOMING' }}
          />

          <Stack.Screen
            name='Guide'
            children={({ navigation }) => <Guide
              unsubscribe={unsubscribe}
              navigation={navigation}
            />}
            options={{ title: '사진 가이드' }}
          />

          <Stack.Screen
            name='ImageCheck'
            children={({ navigation }) => <ImageCheck
              url={flooming.url()}
              image={image}
              flowerData={flowerData}
              unsubscribe={unsubscribe}
              updateFlowerData={updateFlowerData}
              getImage={getImage}
              navigation={navigation}
            />}
            options={{ title: '사진 선택' }}
          />

          <Stack.Screen
            name='ClassResult'
            children={(({ navigation }) => <ClassResult
              url={flooming.url()}
              flowerData={flowerData}
              currentImage={image}
              unsubscribe={unsubscribe}
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
              unsubscribe={unsubscribe}
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
              unsubscribe={unsubscribe}
              getImage={getImage}
              updateFlowerData={updateFlowerData}
              getLoadData={getLoadData}
              updateLoadData={updateLoadData}
              navigation={navigation}
            />)}
            options={{ title: '전시관' }}
          />

        </Stack.Navigator>
      </NavigationContainer >
    )
  }
}

export default React.memo(App);