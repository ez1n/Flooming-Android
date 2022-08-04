import React from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View } from 'react-native';

const ErrorModal = (props) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.onError}
      onRequestClose={props.handleGoBack}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.errorMessageText}>{props.errorMessage}</Text>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={props.handleGoBack}>
              <Text style={styles.modalButtonText}>{props.comment}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  )
};

export default ErrorModal;


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 350,
    height: 200,
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
  modalButtonContainer: {
    width: 100,
    height: 35,
    backgroundColor: '#0C0B0C',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    fontSize: 20,
    color: '#FCFCFC',
    fontFamily: 'symkyungha',
  },
})