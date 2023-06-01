import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import {saveCustomername} from '../../../Redux/Slices/StockTakeSlice';

const MoreDetails = (props: any) => {
  const timerRef: any = useRef(null);
  const dispatch = useDispatch();
  const Customer_name = useSelector(
    (state: any) => state.StockTake.customer_name,
  );
  const [show, setShow] = useState(false);
  const [customerName, setcustomer_name] = useState(Customer_name);

  const Onchange = async (value: any) => {
    setcustomer_name(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      dispatch(saveCustomername(value));
    }, 200);
  };
  return (
    <View style={styles.MoreDetails}>
      <TouchableOpacity
        style={styles.moreHeader}
        onPress={() => setShow(!show)}>
        <Text style={styles.moreHeadertxt}>More Info</Text>
        <Ionicons name="chevron-down" style={styles.moreHeaderIcon} />
      </TouchableOpacity>
      {show ? (
        <>
          <View style={styles.inputBox}>
            <Text style={styles.inputBoxtxt}>Customer Name</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'grey'}
              value={customerName}
              onChangeText={(val: any) => Onchange(val)}
            />
          </View>
        </>
      ) : null}
    </View>
  );
};

export default MoreDetails;
