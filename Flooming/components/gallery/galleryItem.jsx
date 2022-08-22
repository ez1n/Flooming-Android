import React, { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { SliderBox } from 'react-native-image-slider-box';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import AlertModal from '../alertModal';
import ReportModal from './reportModal';

export default function GalleryItem(props) {
  const [onVisible, setOnVisible] = useState(false); // modal state
  const [saveMessage, setSaveMessage] = useState(''); // modal message state
  const [onReport, setOnReport] = useState(false); // 신고 modal state

  // 갤러리 저장 이벤트
  const saveFile = async (picture) => {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync('flooming');

    if (permissions.granted) {
      const asset = await MediaLibrary.createAssetAsync(picture);
      await MediaLibrary.createAlbumAsync('flooming', asset, false);
    }
  };

  const saveImage = async (url) => {
    const pictureDownloadResumable = FileSystem.createDownloadResumable(
      `${props.url}/picture/${url.picture_id}`,
      FileSystem.documentDirectory + '.jpg',
      {}
    );

    try {
      const { uri } = await pictureDownloadResumable.downloadAsync().then(item => {
        return item;
      });

      saveFile(uri)
        .then(() => {
          setOnVisible(true);
          setSaveMessage('저장되었어요 :)');
        })
        .catch(error => {
          setOnVisible(true);
          setSaveMessage('사진을 저장할 수 없어요');
        });
    } catch (error) {
      console.error(error);
      setOnVisible(true);
      setSaveMessage('사진을 저장할 수 없어요');
    };
  };

  // modal 닫기 이벤트
  const handleGoBack = () => { setOnVisible(false) };
  const handleCancelReport = () => { setOnReport(!onReport) };

  return (
    <View style={styles.galleryContainer}>
      {/* 알림창 (modal) */}
      <AlertModal
        onVisible={onVisible}
        handleGoBack={handleGoBack}
        message={saveMessage}
        comment={'닫기'}
      />

      {/* 신고 modal */}
      <ReportModal
        onVisible={onReport}
        galleryId={props.item.galleryId}
        handleGoBack={handleCancelReport}
      />

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
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => {
            saveImage(props.item);
          }}>
            <FontAwesome name='download' size={24} color='#D3D3D3' />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancelReport}>
            <Image style={styles.sirenIcon} source={require('../../assets/siren.png')} />
          </TouchableOpacity>
        </View>
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
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sirenIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  }
})