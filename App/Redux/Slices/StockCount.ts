import {createSlice} from '@reduxjs/toolkit';

function cartWithoutitem(data: any, item: any) {
  let Itemo = data.filter((x: any) => x.qrcode !== item.qrcode);
  return Itemo;
}

function cartInitem(data: any, item: any) {
  let Itemos = data.filter((x: any) => x.qrcode === item.qrcode)[0];
  return Itemos;
}

const addNewItem = (data: any, item: any) => {
  let foundIndex = data.findIndex((x: any) => x.qrcode === item.qrcode);
  if (foundIndex >= 0) {
    data[foundIndex] = item;
    return data;
  } else {
    const cartItem = cartInitem(data, item);
    return cartItem === undefined
      ? [...cartWithoutitem(data, item), {...item}]
      : [
          ...cartWithoutitem(data, item),
          {...cartItem, quantity: cartItem.quantity + 1},
        ];
  }
};

const updateExistItem = (data: any, item: any) => {
  let foundIndex = data.findIndex((x: any) => x.qrcode === item.qrcode);
  let todos = data;
  todos[foundIndex] = {
    ...todos[foundIndex],
    quantity: Number(item.quantity),
  };
  return todos;
};

const RemoveExistitem = (data: any, item: any) => {
  let foundIndex = data.findIndex((x: any) => x.qrcode === item.qrcode);
  const stateTemp = [
    ...data.slice(0, foundIndex),
    ...data.slice(foundIndex + 1),
  ];
  return stateTemp;
};

const StockCountSlice = createSlice({
  name: 'StockCount',
  initialState: {
    data: [],
    item: [],
  },
  reducers: {
    storeData: (state: any, action: any) => {
      state.data = action.payload;
    },
    clearData: (state: any, action: any) => {
      state.data = [];
    },
    addItem: (state: any, action: any) => {
      state.item = addNewItem(state.item, action.payload);
    },
    editItem: (state: any, action: any) => {
      state.item = updateExistItem(state.item, action.payload);
    },
    removeItem: (state: any, action: any) => {
      state.item = RemoveExistitem(state.item, action.payload);
    },
    clearItem: (state, action) => {
      state.item = [];
    },
  },
});

export default StockCountSlice;
export const {storeData, clearData, addItem, editItem, removeItem, clearItem} =
  StockCountSlice.actions;
