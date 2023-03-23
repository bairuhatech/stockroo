import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import COLOR from '../../Config/color';
import Fonts from '../../Config/fonts';
import Share from 'react-native-share';
const ExportModal = (props: any) => {
  const share = () => {
    Share.open({
      title: 'Scan Report',
      message: 'Your scan report',
      url: `file:///${props.path}`,
      subject: 'Scan Report',
    });
    props.close();
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => props.close()}>
      <View style={styles.centeredView}>
        <View style={styles.DropdownModalView}>
          {props.path ? (
            <>
              <Text style={styles.heading}>File is ready</Text>
              <ImageBackground
                source={require('../../Assets/images/excel1.png')}
                style={{width: 100, height: 100, alignSelf: 'center'}}
              />
              <Text style={styles.pathlink}>{props.path}</Text>
              <TouchableOpacity
                style={styles.sharebutton}
                onPress={() => share()}>
                <Text style={styles.sharebuttonTXT}>Share File</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.heading}>Plese wait perparing excel</Text>
              <ImageBackground
                source={require('../../Assets/images/excel.gif')}
                style={{width: 100, height: 100, alignSelf: 'center'}}
              />
            </>
          )}
          <TouchableOpacity onPress={() => props.close()}>
            <Text style={styles.closebtntxt}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExportModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },

  DropdownModalView: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 150,
    marginHorizontal: 15,
    maxHeight: 600,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  heading: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  sharebutton: {
    backgroundColor: COLOR.primary,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  sharebuttonTXT: {
    fontFamily: Fonts.SemiBold,
    color: '#FFF',
    margin: 5,
  },
  closebtntxt: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    color: 'red',
  },
  pathlink: {
    fontFamily: Fonts.Medium,
    margin: 10,
    textAlign: 'center',
    fontSize: 10,
  },
});
