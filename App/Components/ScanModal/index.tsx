import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import COLOR from '../../Config/color';
import Fonts from '../../Config/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CameraScreen} from 'react-native-camera-kit';

const ScanModal = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [continus, setcontinus] = useState(true);

  const onSuccess = (da: any) => {
    if (continus) {
      setLoading(true);
      props.Onchange(da.codeStringValue);
      setTimeout(() => {
        setLoading(false);
      }, 5);
    } else {
      props.Onchange(da.data);
      props.close();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => props.close()}>
      <SafeAreaView style={styles.centeredView}>
        <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
        <View style={styles.ModalHeader}>
          <Text style={styles.ModalHeadertxt}>Scan Item</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setFlashOn(!flashOn)}
              style={{marginRight: 10}}>
              <Ionicons
                size={24}
                color={'#fff'}
                name={flashOn ? 'flash' : 'flash-off'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.close()}>
              <Ionicons name="close" style={styles.icons} />
            </TouchableOpacity>
          </View>
        </View>
        {loading ? null : (
          <CameraScreen
            scanBarcode={true}
            onReadCode={event => onSuccess(event.nativeEvent)}
            showFrame={true}
            laserColor="red"
            frameColor="white"
            cameraRatioOverlay={undefined}
            captureButtonImage={undefined}
            captureButtonImageStyle={{}}
            cameraFlipImage={undefined}
            cameraFlipImageStyle={{}}
            hideControls={undefined}
            torchOnImage={undefined}
            torchOffImage={undefined}
            torchImageStyle={{}}
            onBottomButtonPressed={function (event: any): void {
              console.log('onBottomButtonPressed', event);
            }}
          />
        )}
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', margin: 15}}
          onPress={() => setcontinus(!continus)}>
          <Ionicons
            size={24}
            color={'#fff'}
            name={continus ? 'checkbox' : 'square-outline'}
          />
          <Text style={{color: '#fff', marginLeft: 10}}>Continues Scan</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default ScanModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#000',
  },
  ModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLOR.grey3,
    borderBottomWidth: 1,
    padding: 14,
  },
  ModalHeadertxt: {
    fontFamily: Fonts.SemiBold,
    fontSize: 18,
    color: '#fff',
  },
  icons: {
    fontSize: 30,
    color: 'red',
    marginLeft: 20,
  },
});
