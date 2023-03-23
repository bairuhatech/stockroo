import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import COLOR from '../Config/color';
import Fonts from '../Config/fonts';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ScanModal = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [continus, setcontinus] = useState(true);

  const onSuccess = (da: any) => {
    if (continus) {
      setLoading(true);
      props.Onchange(da.data);
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
      <View style={styles.centeredView}>
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
          <QRCodeScanner
            onRead={onSuccess}
            fadeIn={false}
            reactivate={true}
            reactivateTimeout={2000}
            flashMode={flashOn ? RNCamera.Constants.FlashMode.torch : null}
            showMarker={true}
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
      </View>
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
