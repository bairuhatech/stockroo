import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';
import MoreDetails from './MoreDetails';

const ListHeader = (props: any) => {
  return (
    <>
      <MoreDetails />
      <View style={styles.ListItem}>
        <View style={styles.ListItemItem}>
          <Text style={styles.ListItemItemtxt3}>
            Total Items : {props.items.length}
          </Text>
        </View>
        <View style={styles.horizonalDevide} />
        <View style={styles.ListItemItem}>
          <Text style={styles.ListItemItemtxt3}>
            Total Qty : {props.total_qty}
          </Text>
        </View>
      </View>
      <View style={[styles.ListItem, {backgroundColor: '#E8EAF6'}]}>
        <View style={styles.ListItemItem}>
          <Text style={styles.ListItemItemtxt3}>Location</Text>
        </View>
        <View style={styles.horizonalDevide} />
        <View style={styles.ListItemItem}>
          <Text style={styles.ListItemItemtxt3}>Barcode</Text>
        </View>
        <View style={styles.horizonalDevide} />
        <View style={styles.ListItemItem}>
          <Text style={styles.ListItemItemtxt3}>Quantity</Text>
        </View>
      </View>
    </>
  );
};

export default ListHeader;
