//import liraries
import { HStack, Text, View, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import colors from '../../../common/constant/colors';

// create a component
const CommonButton = ({ src, title, onPress, isLoading = false }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground source={src} style={{ width: '100%' }} resizeMode="stretch">
          <HStack justifyContent="center">
            <Text p={4} alignSelf="center" fontSize="lg" fontWeight="300" color={colors.subtleText}>
              {title}
            </Text>
            {isLoading ? <ActivityIndicator /> : null}
          </HStack>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },

  // btn: {...}
});

CommonButton.propTypes = {
  src: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

//make this component available to the app
export default CommonButton;
