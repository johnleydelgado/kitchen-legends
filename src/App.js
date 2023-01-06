import { AppProvider, UserProvider } from '@realm/react';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { PrivateView, PublicView } from './Main';
import { persistor, store } from './redux/configureStore';

export default function App() {
  const appId = 'application-0-ebqqi';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider id={appId}>
          <UserProvider fallback={<PublicView />}>
            <PrivateView />
          </UserProvider>
        </AppProvider>
      </PersistGate>
    </Provider>
  );
}
