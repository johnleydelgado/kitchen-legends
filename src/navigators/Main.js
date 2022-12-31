import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';

import DashboardNavigator from './DashboardNavigator';

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <DashboardNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
