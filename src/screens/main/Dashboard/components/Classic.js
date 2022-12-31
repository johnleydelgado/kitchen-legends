//import liraries
import { Box, Image, Stack } from 'native-base';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import CommonCard from '../../../../common/components/Cards/CommonCard';
import images from '../../../../common/constant/images';

const Classic = ({ setCategory, animatedStyles }) => {
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
        <Box alignSelf="flex-start" ml={8}>
          <TouchableOpacity
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            onPress={() => setCategory(null)}>
            <Image
              alignSelf="flex-start"
              source={images.back}
              alt="back"
              resizeMethod="scale"
              height={50}
              width={50}
            />
            <Text fontWeight="700">Back</Text>
          </TouchableOpacity>
        </Box>
        <CommonCard title="Create classic" fontSize="4xl" onPress={() => console.log('')} />
      </Stack>
    </Animated.View>
  );
};

//make this component available to the app
export default Classic;
