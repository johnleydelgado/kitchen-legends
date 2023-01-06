//import liraries
import 'react-native-get-random-values';
import { useApp, Realm } from '@realm/react';
import { Box, Center, KeyboardAvoidingView, Text } from 'native-base';
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';

import Forms from '../../common/components/Form/Forms';
import Loading from '../../common/components/Loading/Loading';
import colors from '../../common/constant/colors';
import { width, height } from '../../common/constant/size';
import { setLoading, setUsers } from '../../redux/user';
import LoginForm from './forms/LoginForm';

// create a component
const Login = () => {
  // hooks
  const app = useApp();
  const dispatch = useDispatch();

  const loginHandler = async (data) => {
    const { email, password } = data;
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      dispatch(setUsers(data));
      dispatch(setLoading(false));
      await app.logIn(credentials);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e.message,
        position: 'bottom',
        visibilityTime: 2000,
      });
      dispatch(setLoading(false));
    }
  };

  return (
    <Box flex="1" style={{ backgroundColor: colors.primary }} safeAreaTop={16}>
      <Forms>
        <Center flex={0.5} style={{ justifyContent: 'flex-start' }}>
          <Text fontSize="6xl" fontFamily="heading" color="white">
            KITᑕᕼEᑎ ᒪEGEᑎᗪᔕ
          </Text>
        </Center>
        <Center flex={1} style={{ justifyContent: 'flex-start' }}>
          <LoginForm userLogin={loginHandler} />
        </Center>
      </Forms>
    </Box>
  );
};

// define your styles
const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
    color: '#000000',
    width: width * 0.8,
    height: height * 0.06,
    marginBottom: 5,
    backgroundColor: 'white',
    padding: 5,
    paddingLeft: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  photoShadow: {
    position: 'absolute',
    width: width * 0.8,
    height: height * 0.065,
    borderRadius: 8,
    left: 8,
    top: 0,
  },
  bottonShadow: {
    position: 'absolute',
    width: width * 0.8,
    height: height * 0.055,
    borderRadius: 18,
    left: 4,
    top: 0,
  },
});

//make this component available to the app
export default Login;
