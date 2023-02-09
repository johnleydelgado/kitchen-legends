//import liraries
import { Box, Center, IconButton, Text, Icon } from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../../../common/constant/colors';
// create a component
const PlayerSettings = (props) => {
  const { animatedStyleDefault, playerSettingsHandler, players, selectPlayerHandler } = props;

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: '50%',
          left: '40%',
          width: '46%',
        },
        animatedStyleDefault,
      ]}>
      <Box flexDirection="row" width="full" alignItems="center">
        <IconButton
          bg={colors.success}
          borderRadius={8}
          w="12"
          h="12"
          left="4"
          style={{ zIndex: 8 }}
          onPress={playerSettingsHandler}>
          <Center>
            <Icon as={<Ionicons name="settings-outline" />} size={6} color={colors.secondary} />
          </Center>
        </IconButton>
        <Box bg="white" borderRadius={8} p={6} w="full">
          <Text fontWeight="700" color={colors.text} w="full">
            Player(s) Details
          </Text>
          {players.map((a) => (
            <TouchableOpacity
              key={a.name}
              style={{ alignItems: 'flex-start' }}
              onPress={() => selectPlayerHandler(a._id)}>
              <Text
                fontWeight={a.selected ? 'bold' : '200'}
                fontSize={18}
                color={a.selected ? colors.primary : colors.text}
                key={a.name}>
                {a.selected ? '*' : ''} {a.name}
              </Text>
            </TouchableOpacity>
          ))}
        </Box>
      </Box>
    </Animated.View>
  );
};

//make this component available to the app
export default PlayerSettings;
