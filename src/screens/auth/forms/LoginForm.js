//import liraries
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Button, Stack } from 'native-base';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommonButton from '../../../common/components/Buttons/CommonButton';
import CommonTextField from '../../../common/components/TextFields/CommonTextField';
import colors from '../../../common/constant/colors';
import images from '../../../common/constant/images';
import { AUTH } from '../../../common/constant/screens';
import { loginInitialValue, loginSchema } from '../../../common/formik/users';
import { setLoading } from '../../../redux/user';

// create a component
const LoginForm = ({ userLogin }) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Formik
      initialValues={loginInitialValue}
      validationSchema={loginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => {
        dispatch(setLoading(true));
        userLogin(values);
      }}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Stack w="100%" h="100%" direction="column" space={4} alignItems="center" paddingX={8}>
          <CommonTextField
            color={colors.primary}
            placeholder="Enter email"
            onChange={handleChange('email')}
            error={errors.email}
          />
          <CommonTextField
            color={colors.primary}
            placeholder="Enter password"
            onChange={handleChange('password')}
            error={errors.password}
            secureTextEntry={!isPasswordVisible}
            rightIcon={isPasswordVisible ? 'eye' : 'eye-off'}
            rightIconOnPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
          <Stack w="100%" h="100%" space={2} mt={10}>
            <CommonButton src={images.buttonOne} title="Login" onPress={handleSubmit} />
            <CommonButton
              src={images.buttonOne}
              title="Create an account"
              onPress={() => navigation.navigate(AUTH.SIGN_UP)}
            />
          </Stack>
        </Stack>
      )}
    </Formik>
  );
};

//make this component available to the app
export default LoginForm;
