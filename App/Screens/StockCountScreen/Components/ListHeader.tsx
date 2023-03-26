import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';

const ListHeader = (props: any) => {
  return (
    <>
      <Text style={styles.SubHeading}>
        Total items : {props.items && props.items.length}
      </Text>
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
