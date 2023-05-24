import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

import Splashscreen from '../Screens/Splashscreen';
import LoginScreen from '../Screens/LoginScreen';
import Homescreen from '../Screens/Homescreen';
import SettingScreen from '../Screens/SettingScreen';

import ScanScreen from '../Screens/ScanScreen';
import StockTakeScreen from '../Screens/StockTakeScreen';
import StockCountScreen from '../Screens/StockCountScreen';

import styles from './styles';
import COLOR from '../Config/color';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const HeaderOption = (props: any) => {
    return {
      title: props.title,
      headerStyle: styles.headerStyleNew,
      headerTintColor: COLOR.black,
      headerTitleStyle: styles.headerTitleStyleNew,
      headerRight: () =>
        props.settings ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingScreen')}>
            <Ionicons name="settings-outline" size={25} color={'#000'} />
          </TouchableOpacity>
        ) : null,
    };
  };

  return (
    <Stack.Navigator
      initialRouteName={'SplashScreen'}
      screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="Splashscreen"
        component={Splashscreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={HeaderOption({title: 'Settings', settings: false})}
      />
      <Stack.Screen
        name="Homescreen"
        options={HeaderOption({title: 'Dashboard', settings: true})}
        component={Homescreen}
      />
      <Stack.Screen
        name="ScanScreen"
        options={HeaderOption({title: 'Scan Inventory', settings: true})}
        component={ScanScreen}
      />
      <Stack.Screen
        name="StockTakeScreen"
        component={StockTakeScreen}
        options={HeaderOption({title: 'Stock Take', settings: true})}
      />
      <Stack.Screen
        name="StockCountScreen"
        component={StockCountScreen}
        options={HeaderOption({title: 'Stock Count', settings: true})}
      />
    </Stack.Navigator>
  );
};
export default Routes;
