import React, { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';

export default function ReportModal(props) {
  const [reportMessage, setReportMessage] = useState(''); // 신고 내용 state

  // 신고 내용 업데이트
  const onChangeReportMessage = (event) => {
    const { eventCount, target, text } = event.nativeEvent;
    setReportMessage(text);
  };

  // 신고
  const report = () => {
    axios.post(`${props.url}/report`, { gallery_id: props.gallery_id, detail: reportMessage })
      .then(res => {
        props.handleGoBack();
        alert('신고되었습니다.');
      })
      .catch(error => console.log(error))
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.onVisible}
      onRequestClose={props.handleGoBack}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.errorMessageText}>신고 사유는 무엇인가요?</Text>

          <TextInput
            style={styles.reportMessage}
            multiline
            numberOfLines={2}
            placeholder='신고 사유를 입력하세요'
            placeholderTextColor='#D3D3D3'
            onChange={event => onChangeReportMessage(event)}
          />

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={report}>
              <Text style={styles.modalButtonText}>신고하기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={props.handleGoBack}>
              <Text style={styles.modalButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 320,
    height: 240,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FCFCFC',
  },
  errorMessageText: {
    fontSize: 25,
    fontFamily: 'symkyungha',
  },
  reportMessage: {
    width: '80%',
    marginTop: 25,
    fontFamily: 'symkyungha',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'black'
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#0C0B0C',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
    marginBottom: 0,
    width: 100
  },
  modalButtonText: {
    fontSize: 20,
    color: '#FCFCFC',
    fontFamily: 'symkyungha',
  },
})