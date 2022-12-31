//import liraries
import { Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

import images from '../../../common/constant/images';

// create a component
const Loading = ({ visible }) => {
  return (
    <AnimatedLoader
      visible
      overlayColor="transparent"
      source={images.loading}
      animationStyle={styles.lottie}
      speed={1}>
      <Text>Loading please wait ...</Text>
    </AnimatedLoader>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
export default Loading;
