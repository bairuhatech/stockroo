import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListItem = (props: any) => {
  return (
    <View style={styles.ListItem}>
      <TouchableOpacity
        style={styles.ListItemItem}
        onLongPress={() => props.Details()}>
        <Text>{props.item.Location}</Text>
      </TouchableOpacity>
      <View style={styles.horizonalDevide} />
      <View style={styles.ListItemItem}>
        <Text>{props.item.Barcode}</Text>
      </View>
      <View style={styles.horizonalDevide} />
      <View style={styles.ListItemItem}>
        <TouchableOpacity onPress={() => props.Decriment(props.item)}>
          <Ionicons name="remove" size={20} style={{padding: 5}} />
        </TouchableOpacity>
        <Text style={styles.ListItemItemtxt3}>{props.item.Quantity}</Text>
        <TouchableOpacity onPress={() => props.Incriment(props.item)}>
          <Ionicons name="add" size={20} style={{padding: 5}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItem;
