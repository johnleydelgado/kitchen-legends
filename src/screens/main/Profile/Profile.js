//import liraries
import 'react-native-get-random-values';
import { useUser } from '@realm/react';
import { Avatar, Box, Button, Center, HStack, Icon, ScrollView, Text, VStack } from 'native-base';
import randomColor from 'randomcolor';
import React from 'react';
import { Platform, ImageBackground } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import CommonButton from '../../../common/components/Buttons/CommonButton';
import colors from '../../../common/constant/colors';
import images from '../../../common/constant/images';

const Dashboard = () => {
  // realm
  const realmUser = useUser();

  // redux
  const { profileInfo } = useSelector((state) => state.user);

  const logOutHandler = async () => realmUser.logOut();

  return (
    <Box flex="1" safeAreaTop={Platform.OS === 'ios' ? 12 : 8} bg={colors.primary}>
      <Box>
        <HStack>
          {/* <IconButton
            icon={<Feather name="arrow-left" size={20} color="black" />}
            onPress={() => navigation.goBack()}
          /> */}
          <Center flex="1" alignSelf="center">
            <Text fontSize="16" fontWeight="600">
              Profile
            </Text>
          </Center>
        </HStack>
      </Box>

      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ paddingBottom: 32 }}>
        <VStack space={5} px="4" pb="7">
          <HStack>
            <Center w="100%" mt="4">
              {/* <Avatar borderColor={colors.primary} borderWidth={2} width="150" height="150" /> */}
              <UserAvatar
                size={100}
                name={`${profileInfo.firstName} ${profileInfo.lastName}`}
                bgColor={randomColor()}
              />
              <Center mt="3">
                <Text fontWeight="600" fontSize="17" color="white">
                  {profileInfo.firstName} {profileInfo.lastName}
                </Text>
              </Center>
              <HStack space={2} mt={2}>
                <CommonButton
                  src={images.buttonOne}
                  title="Edit Profile"
                  onPress={() => console.log('t')}
                />
                <CommonButton
                  src={images.buttonOne}
                  title="Check Info"
                  onPress={() => console.log('t')}
                />
              </HStack>
            </Center>
          </HStack>

          <ImageBackground source={images.card} alt="img" resizeMode="stretch">
            <Box mt="1" py={2} px={4}>
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
          </ImageBackground>
        </VStack>

        <Button
          w="90%"
          alignSelf="center"
          bgColor={colors.subtleText}
          onPress={() => logOutHandler()}>
          Logout
        </Button>
      </ScrollView>
    </Box>
  );
};

//make this component available to the app
export default Dashboard;
