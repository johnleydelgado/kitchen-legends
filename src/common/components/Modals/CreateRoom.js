//import liraries
import { useNavigation } from '@react-navigation/native';
import { Formik, useFormik, useFormikContext } from 'formik';
import { find, includes, isEmpty } from 'lodash';
import { Box, Divider, FlatList, ScrollView, Stack, Text, View, VStack } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useModal } from 'react-native-modalfy';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useRealm } from '../../../realm';
import { Player } from '../../../realm/models/Player';
import { Room } from '../../../realm/models/Room';
import { User } from '../../../realm/models/User';
import { setRoomStatus } from '../../../redux/user';
import colors from '../../constant/colors';
import images from '../../constant/images';
import { MODALS } from '../../constant/modals';
import { STACKS } from '../../constant/screens';
import { height, width } from '../../constant/size';
import { REQUIRED_FIELD } from '../../constant/validationMessage';
import CommonButton from '../Buttons/CommonButton';
import CommonTextField from '../TextFields/CommonTextField';
// create a component
const CreateRoom = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { closeModal } = useModal();
  const localRealm = useRealm();

  const { profileInfo } = useSelector((state) => state.user);
  const [searchPlayers, setSearchPlayers] = useState([]);
  const [searchingPlayer, setSearchingPlayer] = useState('');

  const user = localRealm.objects(User.name);
  const getAllPlayers = user.filtered(`email >= '${profileInfo.email}'`)[0];

  const formik = useFormik({
    initialValues: { roomName: '', players: [] },
    validationSchema: Yup.object().shape({
      roomName: Yup.string().required(REQUIRED_FIELD('room name')),
      players: Yup.array().min(1).required(REQUIRED_FIELD('players')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => addRoomHandler(values),
  });

  const addRoomHandler = (values) => {
    const { roomName, players } = values;

    localRealm.write(async () => {
      try {
        const createdRoom = localRealm.create(
          Room.schema.name,
          new Room({ name: roomName, players })
        );
        const { _id, name } = createdRoom;
        dispatch(setRoomStatus({ ongoing: true, id: _id.toString(), name }));
        getAllPlayers.rooms.push(createdRoom);
        closeModal(MODALS.MODAL_CREATE_ROOM);
        navigation.navigate(STACKS.RANKGAME);
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: e.message,
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
    });
  };

  const selectedPlayerHandler = (values) => {
    const currentArr = formik.values.players;
    const { _id } = values;
    if (isEmpty(find(currentArr, { _id }))) {
      formik.setFieldValue('players', [...currentArr, values]);
    } else {
      formik.setFieldValue(
        'players',
        currentArr.filter((a) => a._id !== _id)
      );
    }
  };

  useEffect(() => {
    let subscribed = false;
    if (!subscribed) {
      const currentArr = formik.values.players;
      let players = getAllPlayers.players.filter(
        (a) => a.name.toLowerCase().indexOf(searchingPlayer.toLocaleLowerCase()) === 0
      );

      players.map((item, index) => {
        if (isEmpty(find(currentArr, { _id: item._id }))) {
          players[index].isSelected = false;
        } else {
          players[index].isSelected = true;
        }
      });
      if (!searchingPlayer) {
        players = [];
      }
      setSearchPlayers(players);
    }
    return () => {
      subscribed = true;
    };
  }, [searchingPlayer, formik.values.players]);

  return (
    <Box w={width * 0.9} h={height / 2}>
      <ImageBackground source={images.modal_bg} style={styles.container} resizeMode="stretch">
        <Box position="absolute" right="-14" top="-22" width="100%">
          <Stack w="20%" alignSelf="flex-end">
            <CommonButton
              src={images.buttonClose}
              onPress={() => closeModal(MODALS.MODAL_CREATE_ROOM)}
              title=""
            />
          </Stack>
        </Box>

        <>
          <VStack space={2}>
            <CommonTextField
              color={colors.primary}
              placeholder="Enter room name"
              onChange={formik.handleChange('roomName')}
              error={formik.errors.roomName}
            />
            <CommonTextField
              color={colors.primary}
              placeholder="Enter player name"
              onChange={(val) => setSearchingPlayer(val)}
              error={formik.errors.players}
            />
            <FlatList
              data={searchPlayers}
              showsVerticalScrollIndicator={false}
              style={{ flexGrow: 1, height: searchPlayers.length ? '30%' : '0%' }}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity
                    style={{
                      backgroundColor: item?.isSelected ? colors.gray : colors.orange,
                      borderRadius: 4,
                      paddingLeft: 32,
                      height: 32,
                      justifyContent: 'center',
                    }}
                    onPress={() => selectedPlayerHandler(item)}>
                    <Text color="white">{item.name}</Text>
                  </TouchableOpacity>
                  <Divider margin={2} />
                </>
              )}
              keyExtractor={(item) => item._id}
            />

            {formik.values.players.length !== 0 ? (
              <>
                <Text fontWeight="700" fontSize="lg" color={colors.text}>
                  Selected Player
                </Text>
                <Text>{formik.values.players.map((a) => a.name).join(',')}</Text>
              </>
            ) : null}
          </VStack>

          <Box position="absolute" bottom="-22" width="100%" alignSelf="center" alignItems="center">
            <Stack w="80%" h="100%" space={2}>
              <CommonButton src={images.buttonOne} title="Play" onPress={formik.handleSubmit} />
            </Stack>
          </Box>
        </>
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
export default CreateRoom;
