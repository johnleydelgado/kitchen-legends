//import liraries
import { KeyboardAvoidingView, ScrollView } from 'native-base';
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { width } from '../../common/constant/size';

// create a component
const Forms = ({ children }) => {
  return (
    <KeyboardAvoidingView
      h={{ base: '400px', lg: 'auto' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      flex="1">
      <ScrollView _contentContainerStyle={{ flexGrow: 1 }} children={children} />
    </KeyboardAvoidingView>
  );
};

//make this component available to the app
export default Forms;
