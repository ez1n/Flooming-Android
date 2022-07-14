import React, {useState} from 'react';
import axios from 'axios';
import { StyleSheet, ImageBackground, View, Image, TextInput } from 'react-native';
import Button from './button';

const ImageResult = (props) => {
  // 갤러리에 들어가야할 데이터
  const [data, setData] = useState(
    {
      photo_id: 1, // props.galleryData.photo_id,
      picture_id: 2, // props.galleryData.picture_id,
      comment: null,
    }
  );

  // comment onChange 이벤트
  const getComment = (event) => {
      const {eventCount, target, text} = event.nativeEvent;
      setData({ ...data, comment: text});
      console.log(data);
  };

  // 갤러리 전시 이벤트
  const handleClickGallery = () => { 
    axios.post('https://e513-121-136-173-243.jp.ngrok.io/picture', data)
    .then((response) => {
      console.log(response);
      props.getLoadDAta(response.data);
      props.navigation.navigate('Gallery');
    })
    .catch((error) => console.log(error))
  };

  // 사진 저장 이벤트
  const handleClickSave = () => {
    //
  };
  

  return (
    <ImageBackground style={styles.backgroundImage} source={require('../assets/images/mainBackground.jpg')}>

      <View style={styles.illustContainer}>
        <Image style={styles.illust} source={require('../assets/images/illustrationimageEx.jpg')} />
        <TextInput
          style={styles.illustText}
          placeholder='남기고 싶은 말이 있나요?'
          placeholderTextColor="#FCFCFC"
          onChange={getComment}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button text={'전시 할래요'} onPress={handleClickGallery} />
        <Button text={'저장 할게요'} onPress={handleClickSave} />
      </View>
    </ImageBackground>
  )
};

export default ImageResult;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  illustContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illust: {
    width: 320,
    height: 320,
    marginBottom: 15,
  },
  illustText: {
    color: '#FCFCFC',
    fontSize: 25,
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})