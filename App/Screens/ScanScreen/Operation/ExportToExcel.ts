import moment from 'moment';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const CreateExcel = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      var newData: any = [];
      var newObj = await data.map(async (i: any) => {
        let obj = {
          "Item ID's": i.qrcode,
          Quantity: i.quantity,
          'Date Time': i.date,
        };
        newData.push(obj);
      });
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(newData);
      XLSX.utils.book_append_sheet(wb, ws, 'Scan');
      const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
      var path = `${RNFS.DownloadDirectoryPath}`;
      var File = path + `/scan-${moment().format('DD-MM-yyyy hh-mm')}.xlsx`;
      var storeFile = await RNFS.writeFile(File, wbout, 'ascii');
      resolve(File);
      //   const checkFolder = await RNFS.exists(path);
      //   if (!checkFolder) {
      //     let createFolder = await RNFS.mkdir(path);
      //     console.log('createFolder', createFolder);
      //     if (createFolder) {
      //       var storeFile = await RNFS.writeFile(File, wbout, 'ascii');
      //       console.log('storeFile', storeFile);
      //       resolve(File);
      //     }
      //   } else {

      //   }
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

export {CreateExcel, OpenExcel, ShareExcel};
