//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { width } from '../../../../common/constant/size';

// create a component
const useCategory = () => {
  // states
  const [category, setCategory] = useState(null);
  const offsetDefault = useSharedValue(0);
  const offsetRank = useSharedValue(width);

  const animatedStyleDefault = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offsetDefault.value }],
    };
  });

  const animatedStyleRank = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offsetRank.value }],
    };
  });

  useEffect(() => {
    switch (category) {
      case 'Rank':
        offsetDefault.value = withSpring(-width);
        offsetRank.value = withSpring(0);
        break;
      default:
        offsetDefault.value = withSpring(0);
        offsetRank.value = withSpring(width);
    }
  }, [category]);

  return { category, setCategory, animatedStyleDefault, animatedStyleRank };
};

//make this component available to the app
export default useCategory;
