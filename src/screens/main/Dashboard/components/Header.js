import { Box, HStack, Icon, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../../../common/constant/colors';
import { STACKS } from '../../../../common/constant/screens';

export const Header = ({ roomName, navigation }) => {
  const exitRoom = () => {
    navigation.navigate(STACKS.DASHBOARD);
  };

  return (
    <>
      <Box safeAreaTop />
      <HStack
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        alignSelf="center"
        w="90%"
        borderRadius={8}
        bg={colors.primary}>
        <Text color="white" fontSize="20" fontWeight="bold" textAlign="center" pl="4">
          Room:{roomName}
        </Text>
        <TouchableOpacity
          style={{ alignItems: 'flex-end', flex: 1, paddingRight: 8 }}
          onPress={exitRoom}>
          <Icon as={<Ionicons name="log-out-outline" />} size={6} color="white" />
        </TouchableOpacity>
        <HStack />
      </HStack>
    </>
  );
};
