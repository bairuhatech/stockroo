import {Platform, StyleSheet} from 'react-native';
import COLOR from '../../Config/color';
import Fonts from '../../Config/fonts';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
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
    minWidth: 90,
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
  ListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderTop: 0.5,
    borderColor: COLOR.grey,
  },
  ListItemItem: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ListItemItem2: {
    width: 30,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizonalDevide: {
    backgroundColor: 'grey',
    height: '100%',
    width: 1,
  },
  ListItemItemtxt1: {},
  ListItemItemtxt2: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
  },
  ListItemItemtxt3: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
  },
  btn1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR.grey4,
  },
  btn2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR.primary,
  },
  btn1txt: {
    fontFamily: Fonts.SemiBold,
    margin: 15,
    color: 'red',
  },
  btn2txt: {
    fontFamily: Fonts.SemiBold,
    margin: 15,
    color: '#fff',
  },
  SubHeading: {
    marginBottom: 20,
    marginTop: 0,
    fontFamily: Fonts.SemiBold,
    fontSize: 17,
  },
});
