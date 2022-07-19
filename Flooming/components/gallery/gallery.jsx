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
  };

  return (
    <ImageBackground
      source={require('../../assets/images/galleryBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>
      <FlatList
        data={props.loadData}
        renderItem={<GalleryItem />}
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