import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {
  RequestfileWritepremission,
  RequestfileReadpremission,
} from '../../Config/Permissons';

const Homescreen = (props: any) => {
  const navigation = useNavigation();
  const Auth = useSelector((state: any) => state.Auth.user);

  useEffect(() => {
    CheckPermisson();
  }, []);

  const CheckPermisson = async () => {
    let checkRead = await RequestfileReadpremission();
    let checkWrite = await RequestfileWritepremission();
    console.log('checkRead', checkRead);
    console.log('checkWrite', checkWrite);
  };

  const navigate = (route: any) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt1}>Welcome StockRoo,</Text>
      <Text style={styles.txt2}>Mr/Ms. {Auth.username},</Text>
      <View style={{margin: 20}} />
      <TouchableOpacity
        style={styles.optionBox}
        onPress={() => navigate('ScanScreen')}>
        <View style={[styles.optionIconBox, {backgroundColor: '#E8EAF6'}]}>
          <MaterialCommunityIcons
            name="qrcode-scan"
            style={styles.optionBoxIcon}
            color={'#3F51B5'}
          />
        </View>
        <View style={{flex: 1, margin: 10}}>
          <Text style={styles.optiontxt1}>Scan</Text>
          <Text style={styles.optiontxt2}>
            Scan items and update count export to excel
          </Text>
        </View>
        <View style={styles.optionArrow}>
          <Ionicons name="ios-arrow-forward-sharp" style={styles.optionIcon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionBox}
        onPress={() => navigate('StockTakeScreen')}>
        <View style={[styles.optionIconBox, {backgroundColor: '#E0F2F1'}]}>
          <MaterialCommunityIcons
            name="clipboard-list-outline"
            style={styles.optionBoxIcon}
            color={'#00897B'}
          />
        </View>
        <View style={{flex: 1, margin: 10}}>
          <Text style={styles.optiontxt1}>Stock Take</Text>
          <Text style={styles.optiontxt2}>
            Scan items and update count export to excel
          </Text>
        </View>
        <View style={styles.optionArrow}>
          <Ionicons name="ios-arrow-forward-sharp" style={styles.optionIcon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionBox}
        onPress={() => navigate('StockCountScreen')}>
        <View style={[styles.optionIconBox, {backgroundColor: '#FFF8E1'}]}>
          <MaterialCommunityIcons
            name="hand-peace"
            style={styles.optionBoxIcon}
            color={'#FFA000'}
          />
        </View>
        <View style={{flex: 1, margin: 10}}>
          <Text style={styles.optiontxt1}>Stock Count</Text>
          <Text style={styles.optiontxt2}>
            Scan items and update count export to excel
          </Text>
        </View>
        <View style={styles.optionArrow}>
          <Ionicons name="ios-arrow-forward-sharp" style={styles.optionIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Homescreen;
