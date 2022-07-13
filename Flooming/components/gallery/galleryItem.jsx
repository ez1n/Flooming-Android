import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const GalleryItem = (props) => {
  // 임시 데이터
  const flower = '../../assets/images/imageEx.jpg';
  const flowerImage = '../../assets/images/illustrationimageEx.jpg';

  // 이미지 전환 이벤트
  const handleChangeImage = () => {
    //
  };

  // 이미지 다운로드 이벤트
  const handleDownloadImage = () => {
    //
  };

  return (
    <View style={styles.galleryContainer}>
      <TouchableOpacity onPress={handleChangeImage}>
        <Image style={styles.image} source={require('../../assets/images/imageEx.jpg')} />
      </TouchableOpacity>
      <View style={styles.commentContainer}>
        <Text style={styles.comment}>comment</Text>
        <TouchableOpacity onPress={handleDownloadImage}>
          <FontAwesome name='download' size={24} color='#D3D3D3' />
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default GalleryItem;

const styles = StyleSheet.create({
  galleryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  image: {
    width: 300,
    height: 300,
  },
  commentContainer: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  comment: {
    color: '#FCFCFC',
    fontSize: 20,
  },
})