//import liraries
import 'react-native-get-random-values';
import { Realm, useApp } from '@realm/react';
import { Box, Center, Text } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch } from 'react-redux';

import Forms from '../../common/components/Form/Forms';
import colors from '../../common/constant/colors';
import { setUsers } from '../../redux/user';
import SignUpForm from './forms/SignUpForm';

// create a component
const SignUp = () => {
  // hooks
  const app = useApp();
  const dispatch = useDispatch();

  const createUser = async (data) => {
    const { email, password } = data;

    try {
      await app.emailPasswordAuth.registerUser({ email, password });
      const credentials = Realm.Credentials.emailPassword(email, password);
      dispatch(setUsers(data));
      await app.logIn(credentials);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e.message,
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <Box
      flex="1"
      style={{ backgroundColor: colors.primary }}
      safeAreaTop={Platform.OS === 'ios' ? 16 : 8}>
      <Forms>
        <Box paddingX={8}>
          <Center flex={0.5} style={{ justifyContent: 'flex-start' }} paddingY={4}>
            <Text fontSize="6xl" fontFamily="heading" color="white">
              Register Account
            </Text>
          </Center>
          <SignUpForm createUser={createUser} />
        </Box>
      </Forms>
    </Box>
  );
};

//make this component available to the app
export default SignUp;
