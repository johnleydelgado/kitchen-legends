//import liraries
import { HStack, Text, View, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import colors from '../../../common/constant/colors';

// create a component
const CommonButton = (props) => {
  const {
    src,
    title,
    onPress,
    isLoading = false,
    widthX = '100%',
    fontColor = colors.subtleText,
  } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground source={src} style={{ width: widthX }} resizeMode="stretch">
          <HStack justifyContent="center">
            <Text p={4} alignSelf="center" fontSize="lg" fontWeight="300" color={fontColor}>
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
  width: PropTypes.any,
  fontColor: PropTypes.any,
};

//make this component available to the app
export default CommonButton;
