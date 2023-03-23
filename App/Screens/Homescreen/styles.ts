import {StyleSheet} from 'react-native';
import Fonts from '../../Config/fonts';
import COLOR from '../../Config/color';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
  },
  txt1: {
    fontFamily: Fonts.Bold,
    fontSize: 20,
    color: COLOR.primary,
  },
  txt2: {
    color: COLOR.grey1,
    fontFamily: Fonts.Medium,
    fontSize: 14,
  },
  optionBox: {
    flexDirection: 'row',
    marginBottom: 20,
    borderColor: COLOR.grey,
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 10,
  },
  optionIconBox: {
    minWidth: 80,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optiontxt1: {
    fontFamily: Fonts.Bold,
    fontSize: 19,
    marginBottom: 5,
    color: '#000',
  },
  optiontxt2: {
    fontFamily: Fonts.Medium,
    fontSize: 10,
    color: COLOR.grey1,
  },
  optionArrow: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  optionIcon: {
    fontSize: 20,
    color: COLOR.grey1,
  },
  optionBoxIcon: {
    fontSize: 30,
  },
});
