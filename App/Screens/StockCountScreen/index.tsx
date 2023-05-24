import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, FlatList, Alert} from 'react-native';
import styles from './styles';
import EmptyBox from '../../Components/EmptyBox';
import QRinputBox from '../../Components/QRinputBox';
import ExportModal from '../../Components/ExportModal';
import DetailsFormModal from './Components/DetailsFormModal';
import {
  ReadExcel,
  CreateExcel,
  CreateSample,
  OpenExcel,
  ShareExcel,
} from './Operation/ExportToExcel';
import {
  storeData,
  clearData,
  editItem,
  clearItem,
} from '../../Redux/Slices/StockCountSlice';
import ListHeader from './Components/ListHeader';
import ListItem from './Components/ListItem';

const StockCountScreen = (props: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const data = useSelector((state: any) => state.StockCount.data);
  const items = useSelector((state: any) => state.StockCount.item);
  const [qrcode, setqrcode] = useState<string>('');
  const [exportit, setxport] = useState(false);
  const [exportURL, setexportURL] = useState<any>(null);
  const [DetailModal, setDetailModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  navigation.setOptions({
    headerRight: () =>
      data.length ? (
        <TouchableOpacity onPress={() => dispatch(clearData([]))}>
          <Text style={styles.headerxt}>Reset</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => CreateSample()}>
          <Text style={styles.headerxt}>Sample</Text>
        </TouchableOpacity>
      ),
  });

  const FilePicker = async () => {
    let Filedata: any = await ReadExcel();
    if (Filedata && Filedata.length) {
      dispatch(storeData(Filedata));
    }
  };

  const addNewItem = async (code: any) => {
    if (code && code) {
      let foundItemIndex = items.findIndex(
        (x: any) => Number(x.Barcode) === Number(code),
      );
      if (foundItemIndex >= 0) {
        setCurrentItem(items[foundItemIndex]);
        setDetailModal(true);
      } else {
        let foundIndex = data.findIndex(
          (x: any) => Number(x.Barcode) === Number(code),
        );
        if (foundIndex >= 0) {
          setCurrentItem(data[foundIndex]);
          setDetailModal(true);
        } else {
          console.log('not found');
        }
      }
    } else {
      console.log('no qrcode', code);
    }
  };

  const Incriment = async (item: any) => {
    let value = Object.freeze(item);
    value['Quantity'] = Number(value.Quantity) + 1;
    dispatch(editItem(value));
  };

  const Decriment = async (item: any) => {
    let value = Object.freeze(item);
    let qty = Number(value.Quantity) - 1;
    if (qty >= 1) {
      value['Quantity'] = qty;
      dispatch(editItem(value));
    }
  };

  const Export = async () => {
    setxport(true);
    setexportURL(null);
    let FilePath = await CreateExcel(items);
    if (FilePath) {
      setTimeout(() => {
        setexportURL(FilePath);
      }, 2000);
    }
  };

  const Clear = () => {
    Alert.alert('Clear list', 'Are you sure Clear all items ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Clear',
        onPress: async () => {
          dispatch(clearItem([]));
          dispatch(clearData([]));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {data && data.length ? (
        <View style={{flex: 1}}>
          <QRinputBox
            value={qrcode}
            onChangeText={(val: any) => setqrcode(val)}
            onSubmitEditing={() => addNewItem(qrcode)}
            onScanned={(val: any) => addNewItem(val)}
            continueScan={(val: any) => addNewItem(val)}
          />
          {items && items.length ? (
            <FlatList
              data={items}
              contentContainerStyle={{
                flexGrow: 1,
                margin: 20,
                paddingBottom: 40,
              }}
              ListHeaderComponent={<ListHeader items={items} />}
              renderItem={({item}: any) => (
                <ListItem
                  item={item}
                  Decriment={() => Decriment(item)}
                  Incriment={() => Incriment(item)}
                  Details={() => addNewItem(item.Barcode)}
                />
              )}
              keyExtractor={(item: any) => item.Barcode}
            />
          ) : (
            <View style={{flex: 1}} />
          )}
          {items && items.length ? (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.btn1} onPress={() => Clear()}>
                <Text style={styles.btn1txt}>CLEAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn2} onPress={() => Export()}>
                <Text style={styles.btn2txt}>EXPORT</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : (
        <EmptyBox
          text1={'No data found.'}
          text2={'upload .xlsx format file for further activies.'}
          ActionButton={true}
          ActionText={'Upload File'}
          Action={() => FilePicker()}
        />
      )}
      {DetailModal ? (
        <DetailsFormModal
          visible={DetailModal}
          clearQrcode={() => setqrcode('')}
          close={() => setDetailModal(false)}
          data={currentItem}
        />
      ) : null}
      {exportit ? (
        <ExportModal
          visible={exportit}
          path={exportURL}
          close={() => {
            setxport(false);
            setexportURL(null);
          }}
          OpenFile={() => OpenExcel(exportURL)}
          ShareFile={() => ShareExcel(exportURL)}
        />
      ) : null}
    </View>
  );
};

export default StockCountScreen;
