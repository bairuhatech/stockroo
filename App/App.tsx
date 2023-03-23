import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Store, PersistedStore} from './Redux/Store';
import Routes from './Routes';

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={PersistedStore}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
          />
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
