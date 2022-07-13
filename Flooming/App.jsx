import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Main from './components/main';
import Guide from './components/guide';
import ImageCheck from './components/imageCheck';
import Result from './components/result/result';

Stack = createNativeStackNavigator();

export default function App() {
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
        name='Result'
        component={Result}
        options={{ title: '분류 결과' }}
        />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
