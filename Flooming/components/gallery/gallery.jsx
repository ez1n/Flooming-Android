import React, { useState } from 'react';
import { StyleSheet, ImageBackground, FlatList, Text } from 'react-native';
import GalleryItem from './galleryItem';

const Gallery = (props) => {
  const [isLoading, setIsLoading] = useState(true); // 화면 로딩 state
  const [isRefreshing, setIsRefreshing] = useState(false); // 새로고침 state

  // 데이터 로딩 이벤트 (새로고침)
  const refreshData = () => {
    setIsLoading(false);
    // 통신으로 데이터 받아와야함
  }

  // 임시
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(i);
  }

  return (
    <ImageBackground style={styles.backgroundImage} source={require('../../assets/images/galleryBackground.jpg')}>
      <FlatList
        data={arr}
        renderItem={() => <GalleryItem loadData={props.loadData} />}
        refreshing={isRefreshing}
        onRefresh={refreshData}
        windowSize={3}
      />
    </ImageBackground>
  )
};

export default Gallery;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
})