import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, StatusBar, ImageBackground, Platform} from 'react-native';
import styles from './styles';
import {CommonActions} from '@react-navigation/native';
const Splashscreen = (props: any) => {
  const Auth = useSelector((state: any) => state.Auth);
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
    }
    checkAuth();
  }, [1]);

  const checkAuth = () => {
    setTimeout(() => {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [Auth.auth ? {name: 'Homescreen'} : {name: 'LoginScreen'}],
        }),
      );
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../Assets/images/giphy.gif')}
        style={{width: 150, height: 150}}
      />
    </View>
  );
};

export default Splashscreen;
