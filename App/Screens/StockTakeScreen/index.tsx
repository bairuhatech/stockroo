import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {View, TouchableOpacity, Text, FlatList, Alert} from 'react-native';
import styles from './styles';
import {editItem, clearItem} from '../../Redux/Slices/StockTakeSlice';
import ListItem from './ListItem';
import QRinputBox from '../../Components/QRinputBox';
import ExportModal from '../../Components/ExportModal';
import DetailsFormModal from './DetailsFormModal';
import {CreateExcel, OpenExcel, ShareExcel} from './Operation/ExportToExcel';

const StockTakeScreen = (props: any) => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.StockTake.item);
  const [loading, seloading] = useState(false);
  const [qrcode, setqrcode] = useState<string>('');
  const [exportit, setxport] = useState(false);
  const [exportURL, setexportURL] = useState<any>(null);
  const [DetailModal, setDetailModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const addNewItem = async (code: any) => {
    if (code && code) {
      let foundIndex = items.findIndex((x: any) => x.qrcode === code);
      if (foundIndex >= 0) {
        setCurrentItem(items[foundIndex]);
      } else {
        setCurrentItem({
          qrcode: code,
          quantity: 1,
          Location: null,
          Description: null,
          date: moment().format(),
        });
      }
      setDetailModal(true);
    } else {
      console.log('no qrcode', code);
    }
  };

  const Incriment = async (item: any) => {
    let value = Object.freeze(item);
    value['quantity'] = Number(value.quantity) + 1;
    dispatch(editItem(value));
  };

  const Decriment = async (item: any) => {
    let value = Object.freeze(item);
    let qty = Number(value.quantity) - 1;
    if (qty >= 1) {
      value['quantity'] = qty;
      dispatch(editItem(value));
    }
  };

  const Export = async () => {
    setxport(true);
    setexportURL(null);
    let FilePath = await CreateExcel(items);
    if (FilePath) {
      setTimeout(() => {
        seloading(false);
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
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <QRinputBox
        value={qrcode}
        onChangeText={(val: any) => setqrcode(val)}
        onSubmitEditing={() => addNewItem(qrcode)}
        onScanned={(val: any) => addNewItem(val)}
      />
      {items && items.length ? (
        <FlatList
          data={items}
          contentContainerStyle={{flexGrow: 1, margin: 20, paddingBottom: 40}}
          ListHeaderComponent={
            <>
              <Text style={styles.SubHeading}>
                Total items : {items.length}
              </Text>
              <View style={[styles.ListItem, {backgroundColor: '#E8EAF6'}]}>
                <View style={styles.ListItemItem}>
                  <Text style={styles.ListItemItemtxt3}>Location</Text>
                </View>
                <View style={styles.horizonalDevide} />
                <View style={styles.ListItemItem}>
                  <Text style={styles.ListItemItemtxt3}>Barcode</Text>
                </View>
                <View style={styles.horizonalDevide} />
                <View style={styles.ListItemItem}>
                  <Text style={styles.ListItemItemtxt3}>Quantity</Text>
                </View>
              </View>
            </>
          }
          renderItem={({item}: any) => (
            <ListItem
              item={item}
              Decriment={() => Decriment(item)}
              Incriment={() => Incriment(item)}
              Details={() => addNewItem(item.qrcode)}
            />
          )}
          keyExtractor={(item: any) => item.date}
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

      {DetailModal ? (
        <DetailsFormModal
          visible={DetailModal}
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

export default StockTakeScreen;
