import {Platform, StyleSheet} from 'react-native';
import COLOR from '../../Config/color';
import Fonts from '../../Config/fonts';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
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
  MoreDetails: {
    borderTopColor: COLOR.grey,
    borderTopWidth: 0.6,
    paddingTop: 14,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
  },
  moreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moreHeadertxt: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
    color: '#000',
  },
  moreHeaderIcon: {
    fontSize: 20,
    color: '#000',
  },
  inputBox: {
    backgroundColor: COLOR.White,
    borderColor: COLOR.grey,
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 0,
    marginTop: 20,
  },
  inputBoxtxt: {
    fontFamily: Fonts.Medium,
    fontSize: 11,
    marginHorizontal: 14,
    marginTop: 10,
    color: COLOR.grey1,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    fontFamily: Fonts.Medium,
    fontSize: 14,
    padding: Platform.OS === 'ios' ? 12 : 10,
    color: '#000',
  },
});
