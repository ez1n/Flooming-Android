import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Image, ImageBackground, View, Text, TouchableOpacity, Modal } from 'react-native';
import Button from './button';

const ClassResult = (props) => {
  const [selected, setSelected] = useState(false); // modal 상태 state
  const [selectImage, setSelectImage] = useState(null); // 선택한 이미지 state
  // 서버에 요청할 데이터 state (클래스 선택시)
  const [currentImageType, setCurrentImageType] = useState({
    photo_id: props.photoId,
    flower_type: null,
  });

  // 사진 다시 촬영하기 이벤트
  const handleClickReturnButton = () => { props.navigation.navigate('ImageCheck') };

  // 사진 선택 이벤트 (flower_type 업데이트)
  const handleSelectImage = (item) => {
    setSelected(!selected);
    setCurrentImageType({ ...currentImageType, flower_type: item.kor_name });
    setSelectImage(item.img_src);
  };

  // 그림 그리기 이벤트
  const handleClickYes = () => {
    axios.post('https://eb85-211-117-246-158.jp.ngrok.io/picture', currentImageType)
      .then((response) => {
        props.navigation.navigate('ImageResult');
        props.updateGalleryData(response.data);
      })
      .catch((error) => console.log(error))
  };

  // 사진 선택 취소 이벤트
  const handleClickNo = () => { setSelected(!selected) };

  return (
    <ImageBackground
      source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}>

      {/* 사진 선택 다이얼로그 */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={selected}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Image style={styles.resultImage} source={{ uri: selectImage }} />
            <Text>그림을 그려볼까요?</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleClickYes}>
                <Text style={styles.modalButtonText}>예</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={handleClickNo}>
                <Text style={styles.modalButtonText}>아니요</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      <View style={styles.textContainer}>
        {(props.flowerData.data.length > 1) && <Text style={styles.text}>꽃을 선택해 주세요</Text>}
      </View>

      <View style={styles.imageContainer}>

        <View style={styles.myImageContainer}>
          <Text style={styles.myImageText}>당신의 꽃</Text>
          <Image style={styles.myImage} source={{ uri: props.currentImage }} />
        </View>

        <View style={styles.resultImageContainer}>
          {props.flowerData.data.map((item) => (
            <TouchableOpacity onPress={() => handleSelectImage(item)} style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              <Image style={styles.resultImage} source={item.img_src} />
              <Text style={styles.flowerData}>{item.kor_name}({item.eng_name})</Text>
              <Text style={styles.flowerData}>'{item.flower_language}'</Text>
              <Text style={styles.flowerData}>{item.probability}%</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

      <View style={styles.buttonContainer}>
        {(props.flowerData.data.length == 1) &&
          <Button text={'그림을 그려볼까요?'} onPress={handleSelectImage} />
        }
        <Button text={'다시 찍을까요?'} onPress={handleClickReturnButton} />
      </View>
    </ImageBackground >
  )
};

export default ClassResult;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(114, 114, 114, 0.4)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
    width: '70%',
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: '#0C0B0C',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    width: 70,
    margin: 10,
    marginBottom: 0,
  },
  modalButtonText: {
    color: '#FCFCFC',
    fontSize: 15,
    fontFamily: 'symkyungha',
  },
  textContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FCFCFC',
    fontSize: 25,
    fontFamily: 'symkyungha',
  },
  imageContainer: {
    flex: 0.65,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myImageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  myImageText: {
    color: '#FCFCFC',
    fontSize: 20,
    fontFamily: 'symkyungha',
  },
  myImage: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  resultImageContainer: {
    flex: 0.5,
    display: 'flex',
    flexDirection: 'row',
  },
  resultImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  flowerData: {
    color: '#FCFCFC',
    fontSize: 15,
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})