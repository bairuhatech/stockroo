import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';

import Splashscreen from '../Screens/Splashscreen';
import LoginScreen from '../Screens/LoginScreen';
import Homescreen from '../Screens/Homescreen';

import ScanScreen from '../Screens/ScanScreen';
import StockTakeScreen from '../Screens/StockTakeScreen';
import StockCountScreen from '../Screens/StockCountScreen';
import styles from './styles';
import COLOR from '../Config/color';

const Routes = () => {
  const Stack = createNativeStackNavigator();

  const HeaderOption = (props: any) => {
    return {
      title: props.title,
      headerStyle: styles.headerStyleNew,
      headerTintColor: COLOR.black,
      headerTitleStyle: styles.headerTitleStyleNew,
      headerRight: () =>
        props.profile ? (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={30}
              color={'grey'}
            />
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
        name="Homescreen"
        options={HeaderOption({title: 'Dashboard', profile: true})}
        component={Homescreen}
      />
      <Stack.Screen
        name="ScanScreen"
        options={HeaderOption({title: 'Scan Inventory', profile: false})}
        component={ScanScreen}
      />
      <Stack.Screen
        name="StockTakeScreen"
        component={StockTakeScreen}
        options={HeaderOption({title: 'Stock Take', profile: false})}
      />
      <Stack.Screen
        name="StockCountScreen"
        component={StockCountScreen}
        options={HeaderOption({title: 'Stock Count', profile: false})}
      />
    </Stack.Navigator>
  );
};
export default Routes;
