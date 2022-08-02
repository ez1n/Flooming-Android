import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function GalleryItem(props) {
  // 갤러리 저장 이벤트
  const saveFile = async (fileUri) => {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync('flooming');

    if (permissions.granted) {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('flooming', asset, false);
    }
  };

  const saveImage = async (pictureId) => {
    const pictureDownloadResumable = FileSystem.createDownloadResumable(
      `${props.url}/picture/${pictureId}`,
      FileSystem.documentDirectory + '.jpg',
      {}
    );

    try {
      const { uri } = await pictureDownloadResumable.downloadAsync().then((item) => {
        return item;
      });

      saveFile(uri)
        .then(() => {
          alert('저장되었어요')
        });
    } catch (event) {
      console.error(event);
    };
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
        <TouchableOpacity onPress={() => saveImage(props.item.picture_id)}>
          <FontAwesome name='download' size={24} color='#D3D3D3' />
        </TouchableOpacity>
      </View>
    </View>
  )
};

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