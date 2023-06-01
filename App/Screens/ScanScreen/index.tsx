import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TouchableOpacity, Text, FlatList, Alert} from 'react-native';
import styles from './styles';
import {
  addItem,
  editItem,
  removeItem,
  clearItem,
  setTotalQty,
} from '../../Redux/Slices/ScanSlice';
import ListItem from './components/ListItem';
import {CreateExcel, OpenExcel, ShareExcel} from './Operation/ExportToExcel';
import moment from 'moment';
import QRinputBox from '../../Components/QRinputBox';
import ExportModal from '../../Components/ExportModal';
import MoreDetails from './components/MoreDetails';

const ScanScreen = (props: any) => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.Scan.item);
  const total_qty = useSelector((state: any) => state.Scan.total_qty);
  const customer_name = useSelector((state: any) => state.Scan.customer_name);
  const [loading, seloading] = useState(false);
  const [qrcode, setqrcode] = useState<string>('');

  const [exportit, setxport] = useState(false);
  const [exportURL, setexportURL] = useState<any>(null);

  useEffect(() => {
    CalcTotalQty();
  }, [items]);

  const addNewItem = async (code: any) => {
    if (code && code) {
      let obj: any = {
        qrcode: code,
        quantity: 1,
        date: moment().format(),
      };
      dispatch(addItem(obj));
      setqrcode('');
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

  const CalcTotalQty = () => {
    if (items && items.length) {
      var Tqty: any = 0;
      items.map((itemo: any) => {
        return (Tqty = Tqty + Number(itemo.quantity));
      });
      dispatch(setTotalQty(Tqty));
    }
  };

  const Remove = async (item: any) => {
    Alert.alert('Delete Item', 'Are you sure Delete this item?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          let value = Object.freeze(item);
          dispatch(removeItem(value));
        },
      },
    ]);
  };

  const Export = async () => {
    setxport(true);
    setexportURL(null);
    let length = items.length;
    let qty = total_qty;
    let customer = customer_name;
    let FilePath = await CreateExcel(items, length, qty, customer);
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
        continueScan={(val: any) => addNewItem(val)}
      />
      {items && items.length ? (
        <FlatList
          data={items}
          contentContainerStyle={{
            flexGrow: 1,
            margin: 20,
            paddingBottom: 40,
            marginTop: 0,
          }}
          ListHeaderComponent={
            <>
              <MoreDetails />
              <View style={styles.ListItem}>
                <View style={styles.ListItemItem}>
                  <Text style={styles.ListItemItemtxt3}>
                    Total Items : {items.length}
                  </Text>
                </View>
                <View style={styles.horizonalDevide} />
                <View style={styles.ListItemItem}>
                  <Text style={styles.ListItemItemtxt3}>
                    Total Qty : {total_qty}
                  </Text>
                </View>
                <View style={styles.ListItemItem2}></View>
              </View>
              <View style={[styles.ListItem, {backgroundColor: '#E8EAF6'}]}>
                <View style={styles.ListItemItem}>
                  <Text style={styles.ListItemItemtxt3}>Barcode</Text>
                </View>
                <View style={styles.horizonalDevide} />
                <View style={styles.ListItemItem}>
                  <Text style={styles.ListItemItemtxt3}>Quantity</Text>
                </View>
                <View style={styles.horizonalDevide} />
                <View style={styles.ListItemItem2}>
                  <Text style={styles.ListItemItemtxt2}>-</Text>
                </View>
              </View>
            </>
          }
          renderItem={({item}: any) => (
            <ListItem
              item={item}
              Decriment={() => Decriment(item)}
              Incriment={() => Incriment(item)}
              Remove={() => Remove(item)}
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

export default ScanScreen;
