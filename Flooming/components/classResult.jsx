import React, { useState } from 'react';
import { StyleSheet, Image, ImageBackground, View, Text, TouchableOpacity, Modal } from 'react-native';
import Button from './button';

const ClassResult = ({ navigation }) => {
  const [selectImage, setSelectImage] = useState(false);

  // 임시 정보
  const images = [
    { img_src: '../assets/images/imageEx.jpg', kor_name: '장미', eng_name: 'Rose', flower_language: '열렬한 사랑', probability: 50 },
    { img_src: '../assets/images/imageEx.jpg', kor_name: '장미', eng_name: 'Rose', flower_language: '열렬한 사랑', probability: 50 },
    { img_src: '../assets/images/imageEx.jpg', kor_name: '장미', eng_name: 'Rose', flower_language: '열렬한 사랑', probability: 50 },
  ]

  // 사진 다시 촬영하기 이벤트
  const handleClickReturnButton = () => { navigation.navigate('ImageCheck') };

  // 사진 선택 이벤트
  const handleSelectImage = () => { setSelectImage(!selectImage) };

  // 그림 그리기 이벤트
  const handleClickYes = () => { navigation.navigate('ImageResult') };

  // 사진 선택 취소 이벤트
  const handleClickNo = () => { setSelectImage(!selectImage) };

  return (
    <ImageBackground
      source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}>

      {/* 사진 선택 다이얼로그 */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={selectImage}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Image style={styles.resultImage} source={require('../assets/images/imageEx.jpg')} />
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
        {(images.length > 1) && <Text style={styles.text}>꽃을 선택해 주세요</Text>}
      </View>

      <View style={styles.imageContainer}>

        <View style={styles.myImageContainer}>
          <Image style={styles.myImage} source={require('../assets/images/imageEx.jpg')} />
          <Text style={styles.myImageText}>당신의 꽃</Text>
        </View>

        <View style={styles.resultImageContainer}>
          {images.map((item) => (
            <TouchableOpacity onPress={handleSelectImage} style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              {/* 이미지 경로 받아오는거 수정 */}
              <Image style={styles.resultImage} source={require(`../assets/images/imageEx.jpg`)} />
              <Text style={styles.flowerData}>{item.kor_name}({item.eng_name})</Text>
              <Text style={styles.flowerData}>'{item.flower_language}'</Text>
              <Text style={styles.flowerData}>{item.probability}%</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

      <View style={styles.buttonContainer}>
        {(images.length == 1) &&
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
  },
  textContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FCFCFC',
    fontSize: 25,
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
  myImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  myImageText: {
    color: '#FCFCFC',
    fontSize: 20,
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