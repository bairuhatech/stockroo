import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListItem = (props: any) => {
  return (
    <View style={styles.ListItem}>
      <View style={styles.ListItemItem}>
        <Text>{props.item.qrcode}</Text>
      </View>
      <View style={styles.horizonalDevide} />
      <View style={styles.ListItemItem}>
        <TouchableOpacity onPress={() => props.Decriment(props.item)}>
          <Ionicons name="remove" size={20} style={{padding: 5}} />
        </TouchableOpacity>
        <Text style={styles.ListItemItemtxt3}>{props.item.quantity}</Text>
        <TouchableOpacity onPress={() => props.Incriment(props.item)}>
          <Ionicons name="add" size={20} style={{padding: 5}} />
        </TouchableOpacity>
      </View>
      <View style={styles.horizonalDevide} />
      <TouchableOpacity
        style={styles.ListItemItem2}
        onPress={() => props.Remove(props.item)}>
        <Ionicons name="close" color={'red'} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;
