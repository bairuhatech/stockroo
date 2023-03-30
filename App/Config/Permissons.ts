import {PermissionsAndroid, Platform} from 'react-native';
import {Camera} from 'react-native-camera-kit';

const RequestfileWritepremission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'StockRoo',
        message: 'App access to write your Storage',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const RequestfileReadpremission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'StockRoo',
        message: 'App access to read your Storage',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const RequestCamerapremission = async () => {
  if (Platform.OS === 'android') {
    return true;
  } else {
    let check = await Camera.checkDeviceCameraAuthorizationStatus();
    console.log('check camera', check);
    const granted = await Camera.requestDeviceCameraAuthorization();
    if (granted) {
      return true;
    } else {
      return false;
    }
  }
};

export {
  RequestfileWritepremission,
  RequestfileReadpremission,
  RequestCamerapremission,
};
