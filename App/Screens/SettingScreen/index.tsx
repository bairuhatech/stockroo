import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {View, TouchableOpacity, Text, FlatList, Alert} from 'react-native';
import styles from './styles';

const SettingScreen = (props: any) => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.StockTake.item);

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingScreen;
