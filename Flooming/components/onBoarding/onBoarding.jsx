import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import { StyleSheet, View } from 'react-native';
import FirstPage from './firstPage';
import SecondPage from './secondPage';
import ThirdPage from './thirdPage';


export default function OnBoarding(props) {
  const navigation = useNavigation();
  const pagerRef = useRef(null);

  const handleSkip = () => { navigation.navigate('Main') };

  // Page Button 이벤트
  const handleClickPage = (pageNumber) => { pagerRef.current.setPage(pageNumber) };

  return (
    <View style={{ flex: 1 }}>
      <PagerView style={styles.pagerView} initialPage={0} ref={pagerRef}>
        <View key="1" >
          <FirstPage
            handleBack={handleSkip}
            handleNext={() => handleClickPage(1)} />
        </View>

        <View key="2" >
          <SecondPage
            handleBack={() => handleClickPage(0)}
            handleNext={() => handleClickPage(2)} />
        </View>

        <View key="3" >
          <ThirdPage
            handleBack={() => handleClickPage(1)}
            handleNext={handleSkip} />
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