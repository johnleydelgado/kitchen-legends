//import liraries
import 'react-native-get-random-values';
import { useUser } from '@realm/react';
import { Avatar, Box, Button, Center, HStack, Icon, ScrollView, Text, VStack } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import colors from '../../../common/constant/colors';
import { useRealm } from '../../../realm';

const Dashboard = () => {
  // realm
  const realmUser = useUser();
  const realm = useRealm();

  // redux
  const { profileInfo } = useSelector((state) => state.user);

  const logOutHandler = () => {
    realm.write(() => {
      // Delete all objects from the realm.
      realm.deleteAll();
    });
    realm.close();
    if (realm.isClosed) realmUser.logOut();
  };

  return (
    <Box flex="1" safeAreaTop={Platform.OS === 'ios' ? 12 : 8} bg="white">
      <Box>
        <HStack>
          {/* <IconButton
            icon={<Feather name="arrow-left" size={20} color="black" />}
            onPress={() => navigation.goBack()}
          /> */}
          <Center flex="1" alignSelf="center">
            <Text fontSize="16" fontWeight="600">
              Patient Profile
            </Text>
          </Center>
        </HStack>
      </Box>

      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ paddingBottom: 32 }}>
        <VStack space={5} px="4" pb="7">
          <HStack mb="2">
            <Center w="100%" mt="4">
              <Avatar borderColor={colors.primary} borderWidth={2} width="150" height="150" />
              <Center mt="3">
                <Text fontWeight="600" fontSize="17" color="#1e1e1e">
                  {profileInfo.firstName} {profileInfo.lastName}
                </Text>
              </Center>
              <HStack space={2} mt={2}>
                <Button
                  mode="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: colors.tertiary,
                    paddingVertical: 3,
                  }}
                  icon="phone-outline"
                  //   onPress={() => callPatient(patientData.mobileNumber)}
                >
                  <Text fontSize="sm" color={colors.text} justifyContent="center">
                    Edit Profile
                  </Text>
                </Button>
                <Button
                  mode="outlined"
                  style={{
                    borderRadius: 10,
                    borderColor: colors.tertiary,
                    borderWidth: 1,
                    paddingVertical: 3,
                    backgroundColor: colors.tertiary,
                  }}
                  icon="message"
                  //   onPress={() => messagePatient(patientData.mobileNumber)}
                >
                  <Text fontSize="sm" color={colors.text} justifyContent="center">
                    Check Info
                  </Text>
                </Button>
              </HStack>
            </Center>
          </HStack>
          <HStack space={3} alignItems="center" my="-2">
            <Center borderRadius="50">
              {/* <Icon as={<MaterialIcons name="home" />} size={5} color="#0fceca" mr="2" /> */}
            </Center>
            <Box>
              <Text color="#181D27" fontWeight="bold" fontSize="14">
                {/* Lives in {patientData.province}, {patientData.city} */}
              </Text>
            </Box>
          </HStack>

          <Box>
            <Center>
              <Text color="#676767" fontWeight="bold" fontSize="14">
                Suggested Actions
              </Text>
            </Center>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack space={2}>
                <Button
                  variant="unstyled"
                  backgroundColor="gray.100"
                  borderRadius={40}
                  borderColor="gray.100"
                  borderWidth={1}
                  padding={4}
                  py={3}
                  mt={3}
                  leftIcon={
                    <Icon as={<MaterialIcons name="add" />} size={4} color={colors.text} />
                  }>
                  <Text fontSize="sm" color={colors.text} justifyContent="center">
                    Create new room
                  </Text>
                </Button>
                <Button
                  variant="unstyled"
                  backgroundColor="gray.100"
                  borderRadius={40}
                  borderColor="gray.100"
                  borderWidth={1}
                  padding={4}
                  py={3}
                  mt={3}
                  leftIcon={
                    <Icon as={<MaterialIcons name="add" />} size={4} color={colors.text} />
                  }>
                  <Text fontSize="sm" color={colors.text} justifyContent="center">
                    Add new player
                  </Text>
                </Button>
                <Button
                  variant="unstyled"
                  backgroundColor="gray.100"
                  borderRadius={40}
                  borderColor="gray.100"
                  borderWidth={1}
                  padding={4}
                  py={3}
                  mt={3}
                  leftIcon={<Icon as={<MaterialIcons name="add" />} size={4} color="#0996c1" />}>
                  <Text fontSize="sm" color="#0996c1" justifyContent="center">
                    Read manual
                  </Text>
                </Button>
              </HStack>
            </ScrollView>
          </Box>
          <Box mt="1" bg="white" py={2} borderRadius={6} shadow={2} px={3}>
            <HStack space={3} alignItems="center" p="2">
              <Center borderRadius="13" backgroundColor="#0d8ab3" p="3" />
              <Box p="2">
                <Text color="#181D27" fontWeight="bold">
                  lorem ipsum
                </Text>
                <Text color="#ABABAB" fontSize="12">
                  lorem ipsum
                </Text>
              </Box>
              <Center flex="1" alignItems="flex-end">
                <Icon as={<Ionicons name="md-chevron-forward" />} size={6} color="#ABABAB" />
              </Center>
            </HStack>
            <HStack space={3} alignItems="center" p="2">
              <Center borderRadius="13" backgroundColor="#ade73a" p="3" />
              <Box p="2">
                <Text color="#181D27" fontWeight="bold">
                  lorem ipsum
                </Text>
                <Text color="#ABABAB" fontSize="12">
                  lorem ipsum
                </Text>
              </Box>
              <Center flex="1" alignItems="flex-end">
                <Icon as={<Ionicons name="md-chevron-forward" />} size={6} color="#ABABAB" />
              </Center>
            </HStack>
            <HStack space={3} alignItems="center" p="2">
              <Center borderRadius="13" backgroundColor="#0fceca" p="3" />
              <Box p="2">
                <Text color="#181D27" fontWeight="bold">
                  lorem ipsum
                </Text>
                <Text color="#ABABAB" fontSize="12">
                  lorem ipsum
                </Text>
              </Box>
              <Center flex="1" alignItems="flex-end">
                <Icon as={<Ionicons name="md-chevron-forward" />} size={6} color="#ABABAB" />
              </Center>
            </HStack>
            <HStack space={3} alignItems="center" p="2">
              <Box p="2">
                <Text color="#181D27" fontWeight="bold">
                  lorem ipsum
                </Text>
                <Text color="#ABABAB" fontSize="12">
                  lorem ipsum
                </Text>
              </Box>
              <Center flex="1" alignItems="flex-end">
                <Icon as={<Ionicons name="md-chevron-forward" />} size={6} color="#ABABAB" />
              </Center>
            </HStack>
            <HStack space={3} alignItems="center" p="2">
              <Center borderRadius="13" backgroundColor="#0996c1" p="3">
                <Icon
                  as={<MaterialCommunityIcons name="radiology-box-outline" />}
                  size={6}
                  color="#fff"
                />
              </Center>
              <Box p="2">
                <Text color="#181D27" fontWeight="bold">
                  lorem ipsum
                </Text>
                <Text color="#ABABAB" fontSize="12">
                  lorem ipsum
                </Text>
              </Box>
              <Center flex="1" alignItems="flex-end">
                <Icon as={<Ionicons name="md-chevron-forward" />} size={6} color="#ABABAB" />
              </Center>
            </HStack>
            <HStack space={3} alignItems="center" p="2">
              <Center borderRadius="13" backgroundColor="#1e1e1e" p="3">
                <Icon as={<Ionicons name="ios-documents" />} size={6} color="#fff" />
              </Center>
              <Box p="2">
                <Text color="#181D27" fontWeight="bold">
                  lorem ipsum
                </Text>
                <Text color="#ABABAB" fontSize="12">
                  lorem ipsum
                </Text>
              </Box>
              <Center flex="1" alignItems="flex-end">
                <Icon as={<Ionicons name="md-chevron-forward" />} size={6} color="#ABABAB" />
              </Center>
            </HStack>
            <HStack space={3} alignItems="center" p="2">
              <Center borderRadius="13" backgroundColor="#8cbd01" p="3" />
              <Box p="2">
                <Text color="#181D27" fontWeight="bold">
                  lorem ipsum
                </Text>
                <Text color="#ABABAB" fontSize="12">
                  lorem ipsum
                </Text>
              </Box>
              <Center flex="1" alignItems="flex-end">
                <Icon as={<Ionicons name="md-chevron-forward" />} size={6} color="#ABABAB" />
              </Center>
            </HStack>
            <HStack space={3} alignItems="center" p="2">
              <Center borderRadius="13" backgroundColor="#de6600" p="3">
                <Icon
                  as={<MaterialCommunityIcons name="file-document-multiple" />}
                  size={6}
                  color="#fff"
                />
              </Center>
              <Box p="2">
                <Text color="#181D27" fontWeight="bold">
                  lorem ipsum
                </Text>
                <Text color="#ABABAB" fontSize="12">
                  lorem ipsum
                </Text>
              </Box>
              <Center flex="1" alignItems="flex-end">
                {/* <Icon as={<Ionicons name="md-chevron-forward" />} size={6} color="#ABABAB" /> */}
              </Center>
            </HStack>
          </Box>
        </VStack>

        <Button w="90%" alignSelf="center" bgColor={colors.error} onPress={() => logOutHandler()}>
          Logout
        </Button>
      </ScrollView>
    </Box>
  );
};

//make this component available to the app
export default Dashboard;
