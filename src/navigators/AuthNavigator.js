import { useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AUTH } from '../common/constant/screens';
import { LoginScreen, SignUpScreen } from '../screens';
// import DashboardNavigator from "./DashboardNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
      // initialRouteName={isLoggedIn ? MAIN.DASHBOARD : MAIN.ONBOARDING}
    >
      <Stack.Screen name={AUTH.LOGIN} component={LoginScreen} />
      <Stack.Screen name={AUTH.SIGN_UP} component={SignUpScreen} />

      {/* <Stack.Screen name={ONBOARDING.ONBOARDING} component={OnBoardingScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
