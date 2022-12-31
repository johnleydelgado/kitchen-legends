import { useApp } from '@realm/react';
import React from 'react';
import 'react-native-get-random-values';
import Realm from 'realm';

// ?instance of Realm app

const AuthContext = React.createContext(null);

const AuthProvider = (props) => {
  const app = useApp();
  const [user, setUser] = React.useState(app.currentUser);
  const [loading, setLoading] = React.useState(false);

  const state = { user, loading };

  React.useEffect(() => {
    if (!user) {
      console.log('No user found, Please Login');
      // signInAnonymous();
    } else {
      console.log('user', user);
    }
  }, [user]);

  //   Functions
  const signIn = (email, password) => {
    setLoading(true);
    const credentials = Realm.Credentials.emailPassword(email, password);
    app
      .logIn(credentials)
      .then((newUser) => {
        setUser(newUser);
      })
      .catch((err) => console.error('Errored: ', err))
      .finally(() => setLoading(false));
  };
  const signUp = async (email, password) => {
    try {
      await app.emailPasswordAuth.registerUser({ email, password });
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    // signOut logic
  };

  const signInAnonymous = async () => {
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      setUser(user);
    } catch (err) {
      console.error('Failed to log in', err);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, signInAnonymous, state }}>
      {props.children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  const auth = React.useContext(AuthContext);
  if (auth == null) {
    throw new Error('useAuth() was called outside of AuthProvider');
  }
  return auth;
};

export { AuthProvider, useAuth };
