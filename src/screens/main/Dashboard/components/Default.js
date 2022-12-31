//import liraries
import { Box, Image, Stack } from 'native-base';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import CommonCard from '../../../../common/components/Cards/CommonCard';
import images from '../../../../common/constant/images';

const Default = ({ setCategory, animatedStyles }) => {
  return (
    <Animated.View style={[{ flex: 1 }, animatedStyles]}>
      <Stack
        flex="1"
        w="100%"
        direction="column"
        alignItems="center"
        space={6}
        mt={22}
        safeAreaTop={16}>
        <CommonCard title="ℂ𝕝𝕒𝕤𝕤𝕚𝕔 📚" onPress={() => console.log('Classic')} />
        <CommonCard title="ℝ𝕒𝕟𝕜 👑" onPress={() => setCategory('Rank')} />
      </Stack>
    </Animated.View>
  );
};

//make this component available to the app
export default Default;
