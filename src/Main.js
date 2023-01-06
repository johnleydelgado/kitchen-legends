import { NavigationContainer } from '@react-navigation/native';
import { useApp } from '@realm/react';
import { extendTheme, Modal, NativeBaseProvider, StatusBar, View } from 'native-base';
import React from 'react';
import { createModalStack, ModalProvider } from 'react-native-modalfy';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { ModalAddPlayer, ModalCreateRoom } from './common/components/Modals/index';
import { SyncProvider } from './context/SyncContext';
import AuthNavigator from './navigators/AuthNavigator';
import MainNavigator from './navigators/Main';
import { RealmProvider } from './realm';

const theme = extendTheme({
  fontConfig: {
    Manrope: {
      100: {
        normal: 'Manrope-ExtraLight',
      },
      200: {
        normal: 'Manrope-Light',
      },
      300: {
        normal: 'Manrope-Regular',
      },
      400: {
        normal: 'Manrope-Regular',
      },
      500: {
        normal: 'Manrope-Medium',
      },
      600: {
        normal: 'Manrope-SemiBold',
      },
      700: {
        normal: 'Manrope-Bold',
      },
    },
  },
  fonts: {
    heading: 'Manrope',
    body: 'Manrope',
    mono: 'Manrope',
  },
});

const PublicView = () => (
  <RealmProvider>
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <AuthNavigator />
        <Toast />
      </NavigationContainer>
    </NativeBaseProvider>
  </RealmProvider>
);

const PrivateView = () => {
  const app = useApp();
  const modalConfig = { ModalAddPlayer, ModalCreateRoom };
  const defaultOptions = { backdropOpacity: 0.6 };
  const realmFileBehavior = {
    type: 'downloadBeforeOpen',
    timeOut: 1000,
    timeOutBehavior: 'openLocalRealm', // open the local realm if the download has not completed within 1000ms
  };

  const stack = createModalStack(modalConfig, defaultOptions);

  const syncConfig = {
    user: app.currentUser,
    flexible: true,
    existingRealmFileBehavior: realmFileBehavior,
    newRealmFileBehavior: realmFileBehavior,
  };

  return (
    <NativeBaseProvider theme={theme}>
      <RealmProvider
        sync={syncConfig}
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator />
          </View>
        }>
        <ModalProvider stack={stack}>
          <SyncProvider>
            <MainNavigator />
            <Toast />
          </SyncProvider>
        </ModalProvider>
      </RealmProvider>
    </NativeBaseProvider>
  );
};

export { PublicView, PrivateView };
