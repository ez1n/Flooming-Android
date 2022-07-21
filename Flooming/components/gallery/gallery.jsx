import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, ImageBackground, FlatList } from 'react-native';
import GalleryItem from './galleryItem';

const Gallery = (props) => {
  const [isLoading, setIsLoading] = useState(true); // 화면 로딩 state
  const [isRefreshing, setIsRefreshing] = useState(false); // 새로고침 state

  // 데이터 로딩 이벤트 (새로고침)
  const refreshData = () => {
    setIsLoading(false);
    console.log('refresh');
    axios.get(`${props.url}/gallery?page=0`)
      .then((response) => { console.log(response.data) })
      .catch((error) => { console.log(error) })
  };

  return (
    <ImageBackground
      source={require('../../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>
      <FlatList
        data={props.loadData.data}
        renderItem={({ item }) => (<GalleryItem item={item} />)}
        refreshing={isRefreshing}
        onRefresh={refreshData}
      />
    </ImageBackground>
  )
};

export default Gallery;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
})