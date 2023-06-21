//import liraries
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import mongoose from 'mongoose';
import { Box, Icon, KeyboardAvoidingView, Text } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, Alert, Platform, Keyboard } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { CountdownCircleTimer, useCountdown } from 'react-native-countdown-circle-timer';
import { useModal } from 'react-native-modalfy';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import CommonLottie from '../../../common/components/Lottie/CommonLottie';
import colors from '../../../common/constant/colors';
import images from '../../../common/constant/images';
import { MODALS } from '../../../common/constant/modals';
import { renderTimer } from '../../../common/helper/renderTimer';
import { useRealm } from '../../../realm';
import { Answer } from '../../../realm/models/Answer';
import { Question } from '../../../realm/models/Question';
import { setRemainingTime } from '../../../redux/timer';
import { setRoomStatus } from '../../../redux/user';
import { Header } from './components/Header';
import PlayerSettings from './components/PlayerSettings';
import { ImageQuestion, InputQuestion, MultipleChoiceQuestion } from './components/Questions';
import useAnimation from './hooks/game/useAnimation';
import usePlayer from './hooks/game/usePlayer';
import useRecord from './hooks/game/useRecord';

const DURATION = 900;

// create a component
const RankGame = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const remainingTime = useSelector((state) => state.timer.remainingTime);

  const { openModal, closeModal } = useModal();

  const { playerSettingsHandler, animatedStyleDefault } = useAnimation();
  const { players, roomStatus, selectPlayerHandler, resetSelectionOfPlayer } = usePlayer();
  const { scoringHandler } = useRecord(players);
  const localRealm = useRealm();

  const [scanning, setScanning] = useState(false);
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState('');
  const [isAnswerSubmit, setIsAnswerSubmit] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [showLottie, setShowLottie] = useState(false);
  const [hideScanBtn, setHideScanBtn] = useState(false);

  const { remainingTime: countDownTime } = useCountdown({
    isPlaying: true,
    duration: DURATION,
    initialRemainingTime: remainingTime ? remainingTime : DURATION,
    colors: '#abc',
  });

  const scanHandler = (e) => {
    const questionRealm = localRealm
      .objects(Question.name)
      .filtered('_id == $0', mongoose.Types.ObjectId(e.data));

    if (!isEmpty(questionRealm)) {
      setQuestion(questionRealm[0]);
      setScanning(!scanning);
    } else {
      setQuestion({});
      setScanning(true);
    }
  };

  const scanBtnHandler = () => {
    if (isEmpty(players.find((a) => a.selected))) return playerSettingsHandler();
    setScanning(!scanning);
  };

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        Alert.alert(
          'Leave room ?',
          'You have unsaved changes. Are you sure to discard them and leave the room?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => {} },
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => {
                dispatch(setRemainingTime(DURATION));
                dispatch(setRoomStatus({ ongoing: false, id: 0, name: '' }));
                navigation.dispatch(e.data.action);
              },
            },
          ]
        );
      }),
    [navigation]
  );

  useEffect(() => {
    setIsAnswerSubmit(false);
    if (isAnswerCorrect === 0 || isAnswerCorrect === 1) {
      setShowLottie(true);
    }
  }, [isAnswerCorrect]);

  useEffect(() => {
    if (isAnswerSubmit) {
      const answerRealm = localRealm
        .objects(Answer.name)
        .filtered('answerId == $0', question?.answerId);
      const { answer: correctAnswer } = answerRealm[0];

      const answerF = answer.toLocaleLowerCase();
      const correctAnswerF = correctAnswer.toLocaleLowerCase();

      if (answerF === correctAnswerF) {
        setIsAnswerCorrect(1);
        scoringHandler(question?.points);
      } else {
        setIsAnswerCorrect(0);
      }
    }
  }, [isAnswerSubmit]);

  // close the question and reset
  useEffect(() => {
    if (showLottie) {
      const intervalId = setInterval(() => {
        setShowLottie(false);
        setQuestion({});
        setIsAnswerCorrect(null);
        resetSelectionOfPlayer();
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [showLottie]);

  useEffect(() => {
    if (!countDownTime) {
      openModal(MODALS.MODAL_GAME_SCORE);
    }
    dispatch(setRemainingTime(countDownTime));
  }, [countDownTime]);

  // close the PlayerSettings side component whenever select a player
  useEffect(() => {
    if (!isEmpty(players)) {
      playerSettingsHandler();
    }
  }, [players]);

  const QuestionView = useCallback(() => {
    switch (question.category) {
      case 'image':
        return (
          <ImageQuestion
            question={question?.questions}
            setAnswer={setAnswer}
            setIsAnswerSubmit={setIsAnswerSubmit}
          />
        );
      case 'multiple_choice':
        return (
          <MultipleChoiceQuestion
            question={question?.questions}
            setAnswer={setAnswer}
            setIsAnswerSubmit={setIsAnswerSubmit}
            answerId={question?.answerId}
          />
        );
      default:
        return (
          <InputQuestion
            question={question?.questions}
            setAnswer={setAnswer}
            setIsAnswerSubmit={setIsAnswerSubmit}
          />
        );
    }
  }, [question.questions]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setHideScanBtn(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setHideScanBtn(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    // openModal(MODALS.MODAL_GAME_SCORE);
    // closeModal(MODALS.MODAL_GAME_SCORE);
    // openModal(MODALS.MODAL_GAME_SCORE);
  }, []);

  return (
    <KeyboardAvoidingView
      flex="1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}>
      <ImageBackground source={images.sprinkle} resizeMode="stretch" alt="img" style={{ flex: 1 }}>
        <Header roomName={roomStatus.name} navigation={navigation} />
        <Box padding={8} w="100%" alignItems="flex-end">
          <CountdownCircleTimer
            isPlaying
            duration={DURATION}
            initialRemainingTime={remainingTime ? remainingTime : DURATION}
            size={72}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[900, 600, 100, 0]}
            children={renderTimer}
          />
        </Box>

        {!scanning && question?.category ? <QuestionView /> : null}
        {showLottie ? (
          isAnswerCorrect ? (
            <CommonLottie visible source={images.correct} />
          ) : (
            <CommonLottie visible source={images.wrong} />
          )
        ) : null}
        {scanning ? (
          <QRCodeScanner
            onRead={(e) => scanHandler(e)}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={<Text>Scan QR</Text>}
            showMarker
            reactivate
            reactivateTimeout={5000}
            bottomContent={
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => setScanning(!scanning)}>
                <Icon as={<Ionicons name="restaurant-outline" />} size={12} color={colors.error} />
                <Text fontSize="20" fontWeight="bold" textAlign="center">
                  Cancel
                </Text>
              </TouchableOpacity>
            }
            cameraStyle={{
              overflow: 'hidden',
              position: 'absolute',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 22,
            }}
          />
        ) : (
          <>
            <PlayerSettings
              animatedStyleDefault={animatedStyleDefault}
              playerSettingsHandler={playerSettingsHandler}
              players={players}
              selectPlayerHandler={selectPlayerHandler}
            />
            {!hideScanBtn && !question?.category ? (
              <Box position="absolute" bottom="16" left="1" right="1">
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={scanBtnHandler}>
                  <Icon as={<Ionicons name="scan-outline" />} size={12} color="#ABABAB" />
                  <Text fontSize="20" fontWeight="bold" textAlign="center">
                    Scan
                  </Text>
                </TouchableOpacity>
              </Box>
            ) : null}
          </>
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

//make this component available to the app
export default RankGame;
