import {StyleSheet} from 'react-native';
import Fonts from '../../Config/fonts';
import COLOR from '../../Config/color';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  mainImage: {
    flex: 2,
    width: '100%',
  },
  logo: {
    height: 150,
    width: 250,
  },
  logoBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubHeading: {
    marginBottom: 20,
    marginTop: 0,
    fontFamily: Fonts.SemiBold,
    fontSize: 17,
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
  headerxt: {
    fontFamily: Fonts.SemiBold,
    color: 'red',
  },
});
