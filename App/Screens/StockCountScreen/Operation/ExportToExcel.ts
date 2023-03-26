import moment from 'moment';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';

const ReadExcel = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const results: any = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.xlsx],
        presentationStyle: 'formSheet',
      });
      let url = results.uri;
      const readFile = await RNFS.readFile(url, 'base64');
      const wbout = XLSX.read(readFile, {type: 'base64'});
      const wsname = wbout.SheetNames[0];
      const ws = wbout.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

const CreateExcel = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      var newData: any = [];
      var newObj = await data.map(async (i: any) => {
        let obj = {
          "Item ID's": i.Barcode,
          Location: i.Location,
          Name: i.Name,
          Description: i.Description,
          Brand: i.Brand,
          UOM: i.UOM,
          Ref: i.Ref,
          Quantity: i.Quantity,
          'Actual Quantity': i['Actual Quantity'],
          Remaining: i.Remaining,
          'Date Time': i.date,
        };
        newData.push(obj);
      });
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(newData);
      XLSX.utils.book_append_sheet(wb, ws, 'StockCount');
      const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
      var path = `${RNFS.DownloadDirectoryPath}`;
      var File =
        path + `/Stock-Count-${moment().format('DD-MM-yyyy hh-mm')}.xlsx`;
      var storeFile = await RNFS.writeFile(File, wbout, 'ascii');
      resolve(File);
    } catch (err) {
      reject(err);
    }
  });
};

const CreateSample = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      var newData: any = [];
      var newObj = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
        async (i: any, index: any) => {
          let obj = {
            Barcode: '12345' + index,
            Location: 'A0001' + index,
            Description: 'bla bla bla',
            Name: 'Item' + index,
            Brand: 'barand',
            UOM: 'TIN',
            Ref: 'Ref',
            'Actual Quantity': 10 + index,
          };
          newData.push(obj);
        },
      );
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(newData);
      XLSX.utils.book_append_sheet(wb, ws, 'sample-count');
      const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
      var path = `${RNFS.DownloadDirectoryPath}`;
      var File =
        path + `/sample-count-${moment().format('DD-MM-yyyy hh-mm')}.xlsx`;
      var storeFile = await RNFS.writeFile(File, wbout, 'ascii');
      resolve(File);
    } catch (err) {
      reject(err);
    }
  });
};

const ShareExcel = async (path: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      Share.open({
        title: 'Scan Report',
        message: 'Your scan report',
        url: `file:///${path}`,
        subject: 'Scan Report',
      });
      resolve(true);
    } catch (err) {
      resolve(false);
    }
  });
};

const OpenExcel = async (path: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      RNFetchBlob.android
        .actionViewIntent(path, 'application/vnd.ms-excel')
        .then(() => {
          console.log('success');
          resolve(true);
        })
        .catch(err => {
          resolve(false);
        });
    } catch (err) {
      resolve(false);
    }
  });
};

export {ReadExcel, CreateExcel, CreateSample, OpenExcel, ShareExcel};
