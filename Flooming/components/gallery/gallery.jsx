import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, ImageBackground, FlatList } from 'react-native';
import GalleryItem from './galleryItem';

const Gallery = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false); // 새로고침 state
  const [pageCount, setPageCount] = useState(1); // 페이지 count state

  // 홈버튼
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <FontAwesome
          name='home'
          size={30}
          color='black'
          onPress={() => {
            props.getImage(null); // 현재 사진 초기화
            props.updateFlowerData({ photo_id: '', probability: '', kor_name: '', eng_name: '', flower_language: '' }); // 꽃 정보 초기화
            props.navigation.popToTop(); // main 페이지로 이동 (스택 초기화)
          }}
        />
      ),
    });
  }, []);

  // 네트워크 연결 확인
  useEffect(() => {
    props.unsubscribe;
    axios.get(`${props.url}/gallery?page=0`)
      .then((response) => {
        props.getLoadData(response.data.result);
        setPageCount(1);
        setIsRefreshing(false);
      })
      .catch((error) => console.log(error))
  }, []);

  // 새로고침 이벤트
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await axios.get(`${props.url}/gallery?page=0`)
      .then((response) => {
        props.getLoadData(response.data.result);
        setPageCount(1);
        setIsRefreshing(false);
      })
      .catch((error) => console.log(error))
  };

  // 스크롤 이벤트
  const handleEndReached = async (page) => {
    await axios.get(`${props.url}/gallery?page=${page}`)
      .then((response) => {
        if (response.data.result.length > 0) {
          console.log('page', pageCount)
          props.updateLoadData(response.data.result);
          setPageCount(pageCount + 1);
        } else {
          console.log('no data');
        }
      })
      .catch((error) => console.log(error))
  };

  if (!props.unsubscribe) {
    return <Error navigation={props.navigation} message={'Network Error'} />
  } else {
    return (
      <ImageBackground
        source={require('../../assets/images/mainBackground.jpg')}
        style={styles.backgroundImage}
        imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>
        <FlatList
          data={props.loadData.data}
          renderItem={({ item }) => (<GalleryItem item={item} url={props.url} />)}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={() => handleEndReached(pageCount)}
          onEndReachedThreshold={0.6}
        />
      </ImageBackground>
    )
  }
};

export default Gallery;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
})