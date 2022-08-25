import React from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View } from 'react-native';

export default function AlertModal(props) {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.onVisible}
      onRequestClose={props.handleGoBack}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.errorMessageText}>{props.message}</Text>

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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    height: '25%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FCFCFC',
  },
  errorMessageText: {
    fontSize: 20,
    fontFamily: 'symkyungha',
  },
  modalButtonContainer: {
    padding: 10,
    backgroundColor: '#0C0B0C',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  modalButtonText: {
    fontSize: 15,
    color: '#FCFCFC',
    fontFamily: 'symkyungha',
  },
})