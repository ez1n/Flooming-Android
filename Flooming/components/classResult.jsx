import React from 'react';
import axios from 'axios';
import { StyleSheet, Image, ImageBackground, View, Text, TouchableOpacity, Modal } from 'react-native';
import Button from './button';

const ClassResult = (props) => {
  // const [selected, setSelected] = useState(false); // modal 상태 state
  // const [selectImage, setSelectImage] = useState(null); // 선택한 이미지 state
  // 서버에 요청할 데이터 state
  const currentImageType = {
    photo_id: props.flowerData.photo_id,
    flower_type: props.flowerData.kor_name,
  };

  // 그림 그리기 이벤트
  const handleDrawImage = () => {
    axios.post('https://38e3-183-99-247-44.jp.ngrok.io/picture', currentImageType)
      .then((response) => {
        props.navigation.navigate('ImageResult');
        props.updateGalleryData(response.data);
      })
      .catch((error) => console.log(error))
  };

  return (
    <ImageBackground
      source={require('../assets/images/mainBackground.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, opacity: 0.9 }}>

      {/* 사진 선택 다이얼로그
      <Modal
        animationType='fade'
        transparent={true}
        visible={selected}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Image style={styles.resultImage} source={{ uri: selectImage }} />
            <Text>그림을 그려볼까요?</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleDrawImage}>
                <Text style={styles.modalButtonText}>예</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={handleClickNo}>
                <Text style={styles.modalButtonText}>아니요</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal> */}

      <View style={styles.textContainer}>
        {(props.flowerData.length > 1) && <Text style={styles.text}>꽃을 선택해 주세요</Text>}
      </View>

      <View style={styles.imageContainer}>

        <View style={styles.myImageContainer}>
          <Text style={styles.myImageText}>당신의 꽃</Text>
          <Image style={styles.myImage} source={{ uri: props.currentImage }} />
        </View>

        <View style={styles.resultImageContainer}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              <Image style={styles.resultImage} source={props.flowerData.img_src} />
              <Text style={styles.flowerData}>{props.flowerData.kor_name} ({props.flowerData.eng_name})</Text>
              <Text style={styles.flowerData}>'{props.flowerData.flower_language}'</Text>
              <Text style={styles.flowerData}>{props.flowerData.probability}%</Text>
            </TouchableOpacity>
        </View>

      </View>

      <View style={styles.buttonContainer}>
        <Button text={'그림을 그려볼까요?'} onPress={handleDrawImage} />
      </View>
    </ImageBackground >
  )
};

export default ClassResult;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
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
    borderRadius: 20,
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
    borderRadius: 20,
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