import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import COLOR from '../../Config/color';
import Fonts from '../../Config/fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
export default function EmptyBox(props: any) {
  return (
    <View style={styles.EmptyBox}>
      <SimpleLineIcons name="social-dropbox" size={100} color={COLOR.grey} />
      <Text style={styles.txt1}>{props.text1}</Text>
      <Text style={styles.txt2}>{props.text2}</Text>
      {props.ActionButton ? (
        <TouchableOpacity style={styles.button} onPress={() => props.Action()}>
          <Text style={styles.buttontxt}>{props.ActionText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  EmptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {
    fontFamily: Fonts.SemiBold,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 14,
  },
  txt2: {
    fontFamily: Fonts.Medium,
    marginBottom: 20,
    color: 'grey',
    fontSize: 12,
  },
  button: {
    backgroundColor: COLOR.primary,
    paddingHorizontal: 30,
    padding: 10,
    borderRadius: 100,
  },
  buttontxt: {
    fontFamily: Fonts.SemiBold,
    color: '#fff',
  },
});
