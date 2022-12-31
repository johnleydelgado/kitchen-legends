import { AppProvider, UserProvider } from '@realm/react';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { PrivateView, PublicView } from './Main';
import { RealmProvider } from './realm';
import { persistor, store } from './redux/configureStore';

export default function App() {
  const appId = 'application-0-ebqqi';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider id={appId}>
          <UserProvider fallback={<PublicView />}>
            <RealmProvider
              fallback={
                <View style={{ flex: 1 }}>
                  <ActivityIndicator />
                </View>
              }>
              <PrivateView />
            </RealmProvider>
          </UserProvider>
        </AppProvider>
      </PersistGate>
    </Provider>
  );
}
