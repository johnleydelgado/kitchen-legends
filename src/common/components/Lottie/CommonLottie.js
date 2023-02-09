//import liraries
import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

// create a component
const CommonLottie = ({ visible, source }) => {
  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="transparent"
      source={source}
      animationStyle={styles.lottie}
      speed={1}
    />
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
    top: 122,
  },
});
export default CommonLottie;
