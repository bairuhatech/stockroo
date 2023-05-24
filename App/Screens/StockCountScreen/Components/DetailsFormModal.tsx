import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import COLOR from '../../../Config/color';
import Fonts from '../../../Config/fonts';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputBox from '../../../Components/InputBox';
import {addItem} from '../../../Redux/Slices/StockCountSlice';

const DetailsFormModal = (props: any) => {
  const dispatch = useDispatch();
  const [Barcode, setBarcode] = useState<any>(props.data.Barcode);
  const [Quantity, setQuantity] = useState<any>(props.data.Quantity);
  const [Location, setLocation] = useState<any>(props.data.Location);
  const [Description, setDescription] = useState<any>(props.data.Description);
  const [date, setdate] = useState<any>(props.data.date);

  const saveItem = () => {
    if (Barcode && Barcode) {
      let obj: any = {
        Barcode: Barcode,
        Location: Location,
        Description: Description,
        Name: props.data.Name,
        Brand: props.data.Brand,
        UOM: props.data.UOM,
        Ref: props.data.Ref,
        Quantity: Quantity,
        'Actual Quantity': props.data['Actual Quantity'],
        Remaining: Number(props.data['Actual Quantity']) - Number(Quantity),
        date: moment().format(),
      };
      dispatch(addItem(obj));
      props.clearQrcode();
      props.close();
    } else {
    }
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
          <Text style={styles.boxtitle}>Take stock Count</Text>
          <TouchableOpacity onPress={() => props.close()}>
            <Ionicons name="close" style={styles.boxHeaderIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{margin: 20}} showsVerticalScrollIndicator={false}>
          <InputBox
            value={Barcode}
            label={'qrcode'}
            placeHolder={'Enter qrcode'}
            onChange={(val: any) => setBarcode(val)}
          />
          <InputBox
            value={Quantity && Quantity.toString()}
            label={`quantity (Remaining: ${
              Quantity && Quantity
                ? Number(props.data['Actual Quantity']) - Number(Quantity)
                : Number(props.data['Actual Quantity'])
            } )`}
            placeHolder={'Enter quantity'}
            keyboardType={'number-pad'}
            onChange={(val: any) => setQuantity(val)}
          />
          <InputBox
            value={Location}
            label={'Location'}
            placeHolder={'Enter Location'}
            onChange={(val: any) => setLocation(val)}
          />
          <InputBox
            value={Description}
            label={'Description'}
            placeHolder={'Enter Description'}
            onChange={(val: any) => setDescription(val)}
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.button} onPress={() => saveItem()}>
            <Text style={styles.buttontxt}>Add</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default DetailsFormModal;

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
  button: {
    backgroundColor: COLOR.primary,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttontxt: {
    fontFamily: Fonts.SemiBold,
    margin: 15,
    color: '#fff',
  },
});
