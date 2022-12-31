//import liraries
import { Formik, useFormik, useFormikContext } from 'formik';
import { Box, Divider, FlatList, ScrollView, Stack, Text, View, VStack } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useModal } from 'react-native-modalfy';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useRealm } from '../../../realm';
import { Player } from '../../../realm/models/Player';
import { User } from '../../../realm/models/User';
import colors from '../../constant/colors';
import images from '../../constant/images';
import { MODALS } from '../../constant/modals';
import { height, width } from '../../constant/size';
import { REQUIRED_FIELD } from '../../constant/validationMessage';
import CommonButton from '../Buttons/CommonButton';
import CommonTextField from '../TextFields/CommonTextField';

// create a component
const AddPlayer = () => {
  const { closeModal } = useModal();
  const localRealm = useRealm();

  const { profileInfo } = useSelector((state) => state.user);
  const [searchPlayers, setSearchPlayers] = useState([]);

  const user = localRealm.objects(User.schema.name);
  const getAllPlayers = user.filtered(`email >= '${profileInfo.email}'`)[0];

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(REQUIRED_FIELD('player name')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => addPlayerHandler(values),
  });

  const addPlayerHandler = () => {
    localRealm.write(async () => {
      const checkPlayerIsExist = getAllPlayers.players.findIndex(
        (a) => a.name === formik.values.name
      );
      // create a player if exist else if not
      if (checkPlayerIsExist === -1) {
        const createdPlayer = localRealm.create(
          Player.schema.name,
          new Player({ name: formik.values.name })
        );
        getAllPlayers.players.push(createdPlayer);

        const players = getAllPlayers.players.filter(
          (a) => a.name.toLowerCase().indexOf(formik.values.name.toLocaleLowerCase()) === 0
        );

        setSearchPlayers(players);
      } else {
        formik.setFieldError('name', 'This player is already exist');
      }
    });
  };

  useEffect(() => {
    let subscribed = false;
    if (!subscribed) {
      let players = getAllPlayers.players.filter(
        (a) => a.name.toLowerCase().indexOf(formik.values.name.toLocaleLowerCase()) === 0
      );

      if (!formik.values.name) {
        players = [];
      }

      setSearchPlayers(players);
    }
    return () => {
      subscribed = true;
    };
  }, [formik.values.name]);

  return (
    <Box w={width * 0.9} h={height / 2}>
      <ImageBackground source={images.modal_bg} style={styles.container} resizeMode="stretch">
        <Box position="absolute" right="-14" top="-22" width="100%">
          <Stack w="20%" alignSelf="flex-end">
            <CommonButton
              src={images.buttonClose}
              onPress={() => closeModal(MODALS.MODAL_ADD_PLAYER)}
              title=""
            />
          </Stack>
        </Box>

        <>
          <VStack space={2}>
            <CommonTextField
              color={colors.primary}
              placeholder="Enter player name"
              onChange={formik.handleChange('name')}
              error={formik.errors.name}
            />
            <FlatList
              data={searchPlayers}
              showsVerticalScrollIndicator={false}
              style={{ flexGrow: 1, height: '70%' }}
              renderItem={({ item }) => (
                <>
                  <View
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: 4,
                      paddingLeft: 32,
                      height: 32,
                      justifyContent: 'center',
                    }}>
                    <Text color={colors.secondary}>{item.name}</Text>
                  </View>
                  <Divider margin={2} />
                </>
              )}
              keyExtractor={(item) => item._id}
            />
          </VStack>

          <Box position="absolute" bottom="-22" width="100%" alignSelf="center" alignItems="center">
            <Stack w="80%" h="100%" space={2}>
              <CommonButton src={images.buttonOne} title="Add" onPress={formik.handleSubmit} />
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
export default AddPlayer;
