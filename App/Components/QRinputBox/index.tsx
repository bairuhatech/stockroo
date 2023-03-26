import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import COLOR from '../../Config/color';
import Fonts from '../../Config/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScanModal from '../ScanModal';

export default function QRinputBox(props: any) {
  const [scan, setscan] = useState(false);
  return (
    <>
      <View style={styles.qrbox}>
        <TextInput
          value={props.value}
          style={styles.input}
          placeholderTextColor={'grey'}
          placeholder="Enter qrcode"
          onChangeText={(val: any) => props.onChangeText(val)}
          onSubmitEditing={(val: any) => props.onSubmitEditing()}
        />
        {props.value ? (
          <TouchableOpacity
            style={styles.qrbutton}
            onPress={() => props.onSubmitEditing()}>
            <Ionicons name="add-circle-outline" style={styles.qrbuttonIcon} />
            <Text style={styles.qrbuttontxt}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.qrbutton}
            onPress={() => setscan(true)}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              style={styles.qrbuttonIcon}
            />
            <Text style={styles.qrbuttontxt}>Scan</Text>
          </TouchableOpacity>
        )}
      </View>
      {scan ? (
        <ScanModal
          visible={scan}
          close={() => setscan(false)}
          Onchange={(val: any) => {
            setscan(false);
            props.onScanned(val);
          }}
        />
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  qrbox: {
    margin: 20,
    backgroundColor: COLOR.White,
    borderColor: COLOR.grey,
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    fontFamily: Fonts.Medium,
    fontSize: 14,
    padding: Platform.OS === 'ios' ? 12 : 10,
    color: '#000',
  },
  qrbutton: {
    backgroundColor: COLOR.primary,
    height: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
  },
  qrbuttonIcon: {
    color: '#fff',
    marginRight: 10,
    fontSize: 20,
  },
  qrbuttontxt: {
    fontFamily: Fonts.SemiBold,
    color: '#fff',
  },
});
