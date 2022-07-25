import React from 'react';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Main from '../main';
import Guide from '../guide';
import MainLoading from '../mainLoading';
import Footer from './footer';

export default function OnBoarding(props) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1" >
          <MainLoading />
          <Footer />
        </View>
        <View key="2" >
          <Main key="2" />
          <Footer />
        </View>
        <View key="3" >
          <Guide key="3" />
          <Footer />
        </View>
      </PagerView>
    </View>
  )
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});