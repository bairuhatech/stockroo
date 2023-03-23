import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';
import {login} from '../../Redux/Slices/AuthSlice';
import InputBox from '../../Components/InputBox';

const LoginScreen = (props: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setusername] = useState(null);
  const [passwrod, setpasswrod] = useState(null);

  const Login = () => {
    let user = {
      username: username,
      passwrod: passwrod,
    };
    dispatch(login(user));
    navigation.reset({routes: [{name: 'Homescreen'}]});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logotxt}>StockRoo</Text>
      <InputBox
        value={username}
        label={'username'}
        placeHolder={'Enter username'}
        onChange={(val: any) => setusername(val)}
      />
      <InputBox
        value={passwrod}
        label={'password'}
        placeHolder={'Enter password'}
        secureTextEntry={true}
        onChange={(val: any) => setpasswrod(val)}
      />
      <TouchableOpacity style={styles.Btn} onPress={() => Login()}>
        <Text style={styles.Btntxt}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgott}>Forgott password ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
