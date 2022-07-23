import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const GalleryItem = (props) => {
  // 이미지 다운로드 이벤트
  const handleDownloadImage = () => {
    //
  };

  return (
    <View style={styles.galleryContainer}>
      <View style={styles.imageContainer}>
        <SliderBox
          style={styles.imageSlider}
          parentWidth={300}
          images={[
            `${props.url}/picture/${props.item.picture_id}`,
            `${props.url}/photo/${props.item.photo_id}`
          ]} 
        />
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.comment}>{props.item.comment}</Text>
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
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageSlider: {
    width: 300,
    height: 300,
    borderRadius: 20,
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
    fontSize: 23,
    fontFamily: 'symkyungha',
  },
})