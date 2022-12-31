//import liraries
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Box, Button, Stack, Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import CommonButton from '../../../common/components/Buttons/CommonButton';
import CommonTextField from '../../../common/components/TextFields/CommonTextField';
import colors from '../../../common/constant/colors';
import images from '../../../common/constant/images';
import { signUpInitialValue, signUpSchema } from '../../../common/formik/users';

// create a component
const SignUpForm = ({ createUser }) => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Formik
      initialValues={signUpInitialValue}
      validationSchema={signUpSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => createUser(values)}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Stack w="100%" h="100%" direction="column" space={4} alignItems="center">
          <CommonTextField
            color={colors.primary}
            placeholder="Enter first name"
            onChange={handleChange('firstName')}
            error={errors.firstName}
          />

          <CommonTextField
            color={colors.primary}
            placeholder="Enter last name"
            onChange={handleChange('lastName')}
            error={errors.lastName}
          />

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
          <Box w="100%">
            <CommonButton src={images.buttonOne} title="Register" onPress={handleSubmit} />
          </Box>
          <Stack w="100%" direction="row" justifyContent="center">
            <Text>Already have an account ?</Text>
            <Text fontWeight="700" onPress={() => navigation.goBack()}>
              {' '}
              Sign in
            </Text>
          </Stack>
        </Stack>
      )}
    </Formik>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default SignUpForm;
