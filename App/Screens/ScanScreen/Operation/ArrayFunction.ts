import moment from 'moment';
const addNewItem = async (data: any, item: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      var arr: any = data;
      var checkItem = arr.findIndex((i: any) => i.qrcode === item);
      if (checkItem >= 0) {
        let Itemo = arr[checkItem];
        Itemo.quantity = Number(Itemo.quantity) + 1;
        arr[checkItem] = Itemo;
        resolve(arr);
      } else {
        let newObj = [
          {
            qrcode: item,
            quantity: 1,
            date: moment().format(),
          },
        ];
        let newarr: any = [...arr, ...newObj];
        resolve(newarr);
      }
    } catch (err) {
      reject(err);
    }
  });
};

const IncrimentItem = async (data: any, item: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve('Incriment');
    } catch (err) {
      reject(err);
    }
  });
};

const DecrimentItem = async (data: any, item: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve('Decriment');
    } catch (err) {
      reject(err);
    }
  });
};

const RemoveItem = async (data: any, item: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve('Remove');
    } catch (err) {
      reject(err);
    }
  });
};

export {addNewItem, IncrimentItem, DecrimentItem, RemoveItem};
