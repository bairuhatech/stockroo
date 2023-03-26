import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import COLOR from '../../Config/color';
import Fonts from '../../Config/fonts';
import {OpenExcel, ShareExcel} from './Operation/ExportToExcel';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ExportModal = (props: any) => {
  const shareFile = async () => {
    let shareo = await ShareExcel(props.path);
  };

  const openFile = async () => {
    let openo = await OpenExcel(props.path);
  };

  return (
    <Modal
      isVisible={props.visible}
      onBackButtonPress={() => props.close()}
      onBackdropPress={() => props.close()}
      statusBarTranslucent={false}
      style={styles.container}>
      <SafeAreaView style={styles.box}>
        <View style={styles.boxHeader}>
          <Text style={styles.boxtitle}>
            {props.path ? 'File is ready' : 'Plese wait perparing excel'}
          </Text>
          <TouchableOpacity onPress={() => props.close()}>
            <Ionicons name="close" style={styles.boxHeaderIcon} />
          </TouchableOpacity>
        </View>
        {props.path ? (
          <>
            <ImageBackground
              source={require('../../Assets/images/excel1.png')}
              style={styles.Image1}
            />
            <Text style={styles.pathlink}>{props.path}</Text>
            <TouchableOpacity style={styles.button1} onPress={() => openFile()}>
              <Text style={styles.button1txt}>Open File</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => shareFile()}>
              <Text style={styles.button1txt}>Share File</Text>
            </TouchableOpacity>
          </>
        ) : (
          <ImageBackground
            source={require('../../Assets/images/excel.gif')}
            style={styles.Image2}
          />
        )}
        <TouchableOpacity onPress={() => props.close()}>
          <Text style={styles.closebtntxt}>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default ExportModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  box: {
    backgroundColor: '#fff',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    overflow: 'hidden',
    maxHeight: '90%',
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxtitle: {
    fontFamily: Fonts.Bold,
    fontSize: 19,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    color: COLOR.black,
    flex: 1,
  },
  boxHeaderIcon: {
    fontSize: 25,
    margin: 15,
    color: 'red',
  },
  Image1: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  Image2: {
    width: 140,
    height: 140,
    alignSelf: 'center',
  },
  pathlink: {
    fontFamily: Fonts.Medium,
    margin: 10,
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 30,
  },
  closebtntxt: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    color: 'red',
    margin: 20,
    marginTop: 10,
  },
  button1: {
    borderBottomColor: COLOR.grey,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  button1txt: {
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
  },
});
