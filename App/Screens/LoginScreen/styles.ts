import {StyleSheet} from 'react-native';
import Fonts from '../../Config/fonts';
import COLOR from '../../Config/color';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  logotxt: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: Fonts.Bold,
    color: COLOR.primary,
    marginBottom: 20,
  },
  Btn: {
    backgroundColor: COLOR.primary,
    borderRadius: 5,
    alignItems: 'center',
    padding: 15,
    borderWidth: 0,
    marginTop: 30,
  },
  Btntxt: {
    color: '#fff',
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
  },
  forgott: {
    margin: 20,
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
  },
});
