import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TextInput, TouchableOpacity, Text, FlatList} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {saveItem, clear} from '../../Redux/Slices/ScanSlice';
import ListItem from './ListItem';
import ScanModal from '../../Components/ScanModal';

var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import ExportModal from './ExportModal';

const ScanScreen = (props: any) => {
  const dispatch = useDispatch();
  const ScanItems = useSelector((state: any) => state.Scan.items);
  const [loading, seloading] = useState(false);
  const [qrcode, setqrcode] = useState<string>('');
  const [items, sitems] = useState([]);

  const [exportit, setxport] = useState(false);
  const [exportURL, setexportURL] = useState<any>(null);
  const [scan, setscan] = useState(false);

  useEffect(() => {
    if (ScanItems && ScanItems.length) {
      sitems(ScanItems);
    }
  }, []);

  const addItem = (code: any) => {
    if (code && code) {
      seloading(true);
      var arr: any = items;
      var checkItem = arr.findIndex((i: any) => i.qrcode === code);
      if (checkItem >= 0) {
        let Itemo = arr[checkItem];
        Itemo.quantity = Number(Itemo.quantity) + 1;
        arr[checkItem] = Itemo;
        sitems(arr);
        Onchange(arr);
      } else {
        let newObj = [
          {
            qrcode: code,
            quantity: 1,
            date: moment().format(),
          },
        ];
        let newarr: any = [...arr, ...newObj];
        sitems(newarr);
        Onchange(newarr);
      }
    } else {
      console.log('no qrcode', code);
    }
  };

  const Incriment = (item: any) => {
    seloading(true);
    var arr: any = items;
    var checkItem = arr.findIndex((i: any) => i.qrcode === item.qrcode);
    if (checkItem >= 0) {
      let Itemo = arr[checkItem];
      Itemo.quantity = Number(Itemo.quantity) + 1;
      arr[checkItem] = Itemo;
    }
    sitems(arr);
    Onchange(arr);
  };

  const Decriment = (item: any) => {
    seloading(true);
    var arr: any = items;
    var checkItem = arr.findIndex((i: any) => i.qrcode === item.qrcode);
    if (checkItem >= 0) {
      let Itemo = arr[checkItem];
      let qty = Number(Itemo.quantity) - 1;
      if (qty >= 1) {
        Itemo.quantity = qty;
      } else {
        Itemo.quantity = 1;
      }
      arr[checkItem] = Itemo;
      sitems(arr);
      Onchange(arr);
    }
  };

  const Onchange = (val: any) => {
    dispatch(saveItem(val));
    setTimeout(() => {
      seloading(false);
      setqrcode('');
    }, 5);
  };

  const Export = () => {
    setxport(true);
    setexportURL(null);
    let sample_data_to_export = items;
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Scan');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    var path =
      RNFS.DownloadDirectoryPath +
      `/scan-${moment().format('DD-MM-yyyy hh-mm')}.xlsx`;
    RNFS.writeFile(path, wbout, 'ascii')
      .then(async (r: any) => {
        setTimeout(() => {
          setexportURL(path);
        }, 2000);
        console.log(r, 'Success', path);
        Clear();
      })
      .catch((e: any) => {
        console.log('Error', e);
      });
  };

  const Clear = () => {
    dispatch(clear());
    sitems([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.qrbox}>
        <TextInput
          value={qrcode}
          style={styles.input}
          placeholderTextColor={'grey'}
          placeholder="Enter qrcode"
          onChangeText={(val: any) => setqrcode(val)}
        />
        {qrcode ? (
          <TouchableOpacity
            style={styles.qrbutton}
            onPress={() => addItem(qrcode)}>
            <Ionicons name="add-circle-outline" style={styles.qrbuttonIcon} />
            <Text style={styles.qrbuttontxt}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.qrbutton}
            onPress={() => setscan(true)}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              style={styles.qrbuttonIcon}
            />
            <Text style={styles.qrbuttontxt}>Scan</Text>
          </TouchableOpacity>
        )}
      </View>
      {items && items.length ? (
        <FlatList
          data={items}
          contentContainerStyle={{flexGrow: 1, margin: 20, paddingBottom: 40}}
          ListHeaderComponent={
            <View style={[styles.ListItem, {backgroundColor: '#E8EAF6'}]}>
              <View style={styles.ListItemItem}>
                <Text style={styles.ListItemItemtxt3}>Barcode</Text>
              </View>
              <View style={styles.horizonalDevide} />
              <View style={styles.ListItemItem}>
                <Text style={styles.ListItemItemtxt3}>Quantity</Text>
              </View>
            </View>
          }
          renderItem={({item}: any) => (
            <ListItem
              item={item}
              Decriment={() => Decriment(item)}
              Incriment={() => Incriment(item)}
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
          close={() => {
            setxport(false);
            setexportURL(null);
          }}
          path={exportURL}
        />
      ) : null}
      {scan ? (
        <ScanModal
          visible={scan}
          close={() => setscan(false)}
          Onchange={(val: any) => addItem(val)}
        />
      ) : null}
    </View>
  );
};

export default ScanScreen;
