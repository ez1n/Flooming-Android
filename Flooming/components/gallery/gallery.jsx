import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, ImageBackground, FlatList } from 'react-native';
import GalleryItem from './galleryItem';

const Gallery = (props) => {
  const [isLoading, setIsLoading] = useState(true); // 화면 로딩 state
  const [isRefreshing, setIsRefreshing] = useState(false); // 새로고침 state
  const [pageCount, setPageCount] = useState(1); // 페이지 count state

  useEffect(() => {
    console.log(props.loadData.data);
  },[])

  // 데이터 로딩 이벤트 (새로고침)
  const handleRefresh = async () => {
    setIsLoading(false);
    await axios.get(`${props.url}/gallery?page=0`)
      .then((response) => { 
        props.getLoadData(response.data.result);
        setPageCount(1);
      })
      .catch((error) => console.log(error))
  };

  // 스크롤 이벤트
  const handleEndReached = async (page) => {
    if (!isLoading) {
      await axios.get(`${props.url}/gallery?page=${page}`)
        .then((response) => {
          props.updateLoadData(response.data.result);
          setPageCount(pageCount + 1);
        })
        .catch((error) => console.log(error))
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>
      <FlatList
        data={pageCount==1 ? props.loadData.data : props.loadData}
        renderItem={({ item }) => (<GalleryItem item={item} url={props.url} />)}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={() => handleEndReached(pageCount)}
        onEndReachedThreshold={0.8}
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