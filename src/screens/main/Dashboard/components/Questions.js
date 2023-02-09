import { Box, Button, Radio, Stack, Text } from 'native-base';
import { Image, Keyboard } from 'react-native';

import CommonButton from '../../../../common/components/Buttons/CommonButton';
import CommonTextField from '../../../../common/components/TextFields/CommonTextField';
import colors from '../../../../common/constant/colors';
import images from '../../../../common/constant/images';
import { checkIfImageQuestion } from '../../../../common/constant/questionImages';
import { selectedChoice } from '../../../../common/helper/multipleChoice';

export const ImageQuestion = ({ question, setAnswer, setIsAnswerSubmit }) => {
  return (
    <Box
      w="90%"
      alignItems="center"
      borderRadius={22}
      shadow
      bgColor="white"
      alignSelf="center"
      mt={8}>
      <Text color="black" fontSize="20" fontWeight="bold" textAlign="center" mt={12} marginX={12}>
        What is the name of kitchen utensils in the picture ?
      </Text>
      <Image
        source={checkIfImageQuestion(question)}
        style={{
          width: 100,
          height: 150,
          marginVertical: 32,
          borderRadius: 8,
          borderWidth: 0.2,
          borderColor: 'black',
        }}
        resizeMode="stretch"
      />
      <Box w="100%" p={4}>
        <CommonTextField
          onChange={(value) => setAnswer(value)}
          placeholder="Type here"
          color={colors.primary}
        />
        <Button
          bg={colors.orange}
          mt={4}
          width={122}
          alignSelf="center"
          onPress={() => setIsAnswerSubmit(true)}>
          Done
        </Button>
      </Box>
    </Box>
  );
};

export const InputQuestion = ({ question, setAnswer, setIsAnswerSubmit }) => {
  return (
    <Box
      w="90%"
      alignItems="center"
      borderRadius={22}
      shadow
      bgColor="white"
      alignSelf="center"
      mt={8}>
      <Text color="black" fontSize="20" fontWeight="bold" textAlign="center" m={12}>
        {question}
      </Text>
      <Box w="100%" px={4} pb={4}>
        <CommonTextField
          onChange={(value) => setAnswer(value)}
          placeholder="Type here"
          color={colors.primary}
        />
        <Button
          bg={colors.orange}
          mt={4}
          width={122}
          alignSelf="center"
          onPress={() => setIsAnswerSubmit(true)}>
          Done
        </Button>
      </Box>
    </Box>
  );
};

export const MultipleChoiceQuestion = ({ question, setAnswer, setIsAnswerSubmit, answerId }) => {
  return (
    <Box
      w="90%"
      alignItems="center"
      borderRadius={22}
      shadow
      bgColor="white"
      alignSelf="center"
      mt={8}>
      <Text color="black" fontSize="20" fontWeight="bold" textAlign="center" m={12}>
        {question}
      </Text>
      <Box w="100%" alignItems="center">
        <Radio.Group
          name="exampleGroup"
          defaultValue="1"
          accessibilityLabel="pick a size"
          onChange={(nextValue) => {
            setAnswer(nextValue);
          }}>
          <Stack
            direction={{
              base: 'column',
              md: 'column',
            }}
            alignItems={{
              base: 'flex-start',
              md: 'flex-start',
            }}
            space={4}
            w="75%"
            maxW="300px">
            {selectedChoice(answerId).items.map((el) => (
              <Radio value={el} colorScheme="green" size="lg" my={1} key={el}>
                {el}
              </Radio>
            ))}
          </Stack>
        </Radio.Group>
        <Button my={8} bg={colors.orange} p={4} width={122} onPress={() => setIsAnswerSubmit(true)}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
