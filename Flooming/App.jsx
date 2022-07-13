import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Main from './components/main';
import Guide from './components/guide';
import ImageCheck from './components/imageCheck';
import ClassResult from './components/classResult';
import ImageResult from './components/imageResult';
import Gallery from './components/gallery/gallery';
import Flooming from './service/flooming';

// 네비게이터
Stack = createNativeStackNavigator();

export default function App() {
  const flooming = new Flooming();

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
        component={ImageCheck}
        options={{ title: '' }}
        />

        <Stack.Screen
        name='ClassResult'
        component={ClassResult}
        options={{ title: '분류 결과' }}
        />

        <Stack.Screen
        name='ImageResult'
        component={ImageResult}
        options={{ title: '그림 결과' }}
        />

        <Stack.Screen
        name='Gallery'
        component={Gallery}
        options={{ title: '갤러리' }}
        />

    </Stack.Navigator>
    </NavigationContainer>
  );
}
