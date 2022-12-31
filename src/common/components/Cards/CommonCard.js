//import liraries
import { Box, Image, Text } from 'native-base';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import colors from '../../../common/constant/colors';
import images from '../../../common/constant/images';

// create a component
const CommonCard = ({ title, onPress, fontSize }) => {
  return (
    <Box w="100%" alignItems="center">
      <TouchableOpacity onPress={onPress} style={{ width: '80%' }}>
        <ImageBackground
          source={images.card}
          style={{ height: 182, justifyContent: 'center', alignItems: 'center' }}
          alt="img"
          resizeMode="stretch">
          <Text fontWeight="700" fontSize={fontSize || '6xl'} color={colors.text}>
            {title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </Box>
  );
};

// define your styles
const styles = StyleSheet.create({
  photoShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    right: -4,
    top: 4,
  },
});

CommonCard.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  fontSize: PropTypes.string,
};

//make this component available to the app
export default CommonCard;
