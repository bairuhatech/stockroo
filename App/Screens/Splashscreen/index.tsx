import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, StatusBar, Image, ImageBackground, Text} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
const Splashscreen = (props: any) => {
  const navigation = useNavigation();
  const Auth = useSelector((state: any) => state.Auth);
  useEffect(() => {
    StatusBar.setTranslucent(true);
    checkAuth();
  }, [1]);

  const checkAuth = () => {
    setTimeout(() => {
      navigation.reset(
        Auth.auth
          ? {routes: [{name: 'Homescreen'}]}
          : {routes: [{name: 'LoginScreen'}]},
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../Assets/images/giphy.gif')}
        style={{width: 100, height: 100}}
      />
    </View>
  );
};

export default Splashscreen;
