//import liraries
import { Box, Button, FormControl, Image, Input, Modal, Stack, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useModal } from 'react-native-modalfy';
import Animated from 'react-native-reanimated';

import CommonCard from '../../../../common/components/Cards/CommonCard';
import images from '../../../../common/constant/images';
import { MODALS } from '../../../../common/constant/modals';

const Rank = ({ setCategory, animatedStyles }) => {
  const { openModal, closeModal } = useModal();

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
            <Text fontWeight="700" color="white">
              Back
            </Text>
          </TouchableOpacity>
        </Box>
        <CommonCard
          title="Create room"
          fontSize="4xl"
          onPress={() => openModal(MODALS.MODAL_CREATE_ROOM)}
        />
        <CommonCard
          title="Add player"
          fontSize="4xl"
          onPress={() => openModal(MODALS.MODAL_ADD_PLAYER)}
        />
      </Stack>

      <Modal
        isOpen={false}
        // isOpen={modalVisible}
        // onClose={() => setModalVisible(false)}
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
      >
        <Modal.Content bg="#14639e">
          <Modal.CloseButton bg="white" />
          <Modal.Header bg="#14639e" _text={{ color: 'white' }}>
            Select players
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label _text={{ color: 'white' }}>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label _text={{ color: 'white' }}>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer bg="#14639e">
            <Button.Group space={2}>
              <Button
                variant="ghost"
                _text={{ color: 'white' }}
                colorScheme="blueGray"
                onPress={() => {
                  //   setModalVisible(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  //   setModalVisible(false);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Animated.View>
  );
};

//make this component available to the app
export default Rank;
