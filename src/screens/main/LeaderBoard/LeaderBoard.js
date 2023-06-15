//import liraries
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import mongoose from 'mongoose';
import { Box, HStack, ScrollView, Text, VStack } from 'native-base';
import randomColor from 'randomcolor';
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserAvatar from 'react-native-user-avatar';

import colors from '../../../common/constant/colors';
import { height } from '../../../common/constant/size';
import { useRealm } from '../../../realm';
import { Room } from '../../../realm/models/Room';

// create a component
const LeaderBoard = () => {
  const localRealm = useRealm();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const scrollRef = useRef();
  const scrolling = useRef(new Animated.Value(0)).current;

  const isFocused = useIsFocused();

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const lastScroll = () => {
    setLoading(true);
    // setRowsPerPage(rowsPerPage + 1);
  };

  useEffect(() => {
    if (isFocused) {
      const rooms = localRealm.objects(Room.name);
      const leaderBoardData = [];

      rooms
        .map((obj) => obj.records)
        .map((records) => {
          console.log('records', records);
          if (records.length > 0) {
            records.map((obj) => {
              const roomFilterByRecordId = rooms.filtered(
                'records._id == $0',
                mongoose.Types.ObjectId(obj._id)
              );
              const roomName = roomFilterByRecordId[0].name;
              leaderBoardData.push({
                playerName: obj?.player?.name || '',
                roomName: roomName || '',
                score: obj?.score || 0,
              });
            });
          }
        });

      setData(leaderBoardData.sort((a, b) => b.score - a.score));
    }
  }, [isFocused]);
  console.log('aaa', page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <Box bgColor={colors.primary} style={{ flex: 1, padding: 32 }} safeAreaTop={16}>
      <Text fontSize={32} fontWeight="thin" color="gray.800">
        Leaderboard
      </Text>
      {/* {data.length === 3 ? (
        <>
          <Box
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              alignItems: 'center',
              top: 32,
            }}>
            <Text fontWeight="700" fontSize="5xl">
              👑
            </Text>
          </Box>
          <HStack space={2} justifyContent="space-between" pt={8}>
            <Box
              style={{ marginTop: 22, borderWidth: 4, borderColor: '#83d1fd', borderRadius: 100 }}>
              <UserAvatar size={80} name={data[1].playerName} bgColor="white" textColor="black" />
            </Box>
            <Box
              style={{ borderWidth: 6, marginTop: 0, borderColor: '#81ff9e', borderRadius: 100 }}>
              <UserAvatar size={100} name={data[0].playerName} bgColor="white" textColor="black" />
            </Box>
            <Box
              style={{ marginTop: 22, borderWidth: 4, borderColor: '#8786fc', borderRadius: 100 }}>
              <UserAvatar size={80} name={data[2].playerName} bgColor="white" textColor="black" />
            </Box>
          </HStack>
        </>
      ) : null} */}
      {isEmpty(data) ? (
        <Box justifyContent="center" alignItems="center" height="100%">
          <Text fontSize={32} fontWeight="thin" color="gray.600">
            No Records
          </Text>
        </Box>
      ) : null}
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: height * 0.1 }}
        onScroll={({ nativeEvent }) => {
          // scrolling.setValue(nativeEvent.contentOffset.y);
          // if (isCloseToBottom(nativeEvent)) {
          //   if (!loading) {
          //     lastScroll();
          //   }
          // }
        }}
        scrollEventThrottle={16}>
        <VStack space={2} pt={4}>
          {data.map((obj, index) => (
            <Box
              style={{
                borderWidth: 2,
                borderColor: randomColor(),
                height: 68,
                backgroundColor: 'white',
                borderRadius: 16,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              key={Math.random()}
              p={4}>
              <HStack space={2} style={{ alignItems: 'center' }}>
                <Text>{index + 1}</Text>
                <VStack justifyContent="center" alignItems="center">
                  {index < 3 ? (
                    <Text fontWeight="700" fontSize="md">
                      👑
                    </Text>
                  ) : null}

                  <UserAvatar size={32} name={obj.playerName} bgColor={randomColor()} />
                </VStack>
                <VStack justifyContent="center">
                  <Text>{obj.playerName}</Text>
                  <Text>Room: {obj.roomName}</Text>
                </VStack>
              </HStack>
              <Text>{obj.score} pts</Text>
            </Box>
          ))}
        </VStack>
      </Animated.ScrollView>
    </Box>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default LeaderBoard;
