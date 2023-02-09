//import liraries
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import mongoose from 'mongoose';
import { Box, Flex, HStack, ScrollView, Stack, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useModal } from 'react-native-modalfy';
import { useDispatch, useSelector } from 'react-redux';

import { useRealm } from '../../../realm';
import { Room } from '../../../realm/models/Room';
import { setRoomStatus } from '../../../redux/user';
import colors from '../../constant/colors';
import images from '../../constant/images';
import { MODALS } from '../../constant/modals';
import { STACKS } from '../../constant/screens';
import { height, width } from '../../constant/size';
import CommonButton from '../Buttons/CommonButton';

// create a component
const GameScore = () => {
  const localRealm = useRealm();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { roomStatus } = useSelector((state) => state.user);
  const { closeModal } = useModal();
  const [recordData, setRecordData] = useState([]);

  const back = () => {
    closeModal(MODALS.MODAL_GAME_SCORE);
    dispatch(setRoomStatus({ ongoing: false, id: 0, name: '' }));
    navigation.navigate(STACKS.DASHBOARD);
  };

  useEffect(() => {
    const roomRealm = localRealm
      .objects(Room.name)
      .filtered('_id == $0', mongoose.Types.ObjectId(roomStatus.id));
    if (!isEmpty(roomRealm)) {
      const { records } = roomRealm[0];
      setRecordData(records);
    }
  }, []);
  return (
    <Box w={width * 0.9} h={height / 2}>
      <ImageBackground source={images.modal_bg} style={styles.container} resizeMode="stretch">
        <VStack space={4}>
          <Text textAlign="center" fontWeight="700" fontSize="2xl" color={colors.text}>
            Game Score
          </Text>
          <HStack space={8}>
            <Text w="40">Player Name</Text>
            <Text w="40">Score</Text>
          </HStack>
        </VStack>

        <ScrollView _contentContainerStyle={{ flex: 1, width, height }}>
          {recordData.map((a) => (
            <HStack space={8} key={a.player.name} w="100%">
              <Text fontWeight="700" fontSize="2xl" color={colors.text} w="40">
                {a.player.name}
              </Text>

              <Text fontWeight="700" fontSize="2xl" color={colors.text} w="40">
                {a.score}
              </Text>
            </HStack>
          ))}
        </ScrollView>

        <Stack w="100%" space={2} pt={8}>
          <CommonButton src={images.buttonOne} title="Exit Room" onPress={() => back()} />
        </Stack>
      </ImageBackground>
    </Box>
  );
};
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 34,
    paddingTop: 44,
  },
});
//make this component available to the app
export default GameScore;
