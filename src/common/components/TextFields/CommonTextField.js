//import liraries
import { Box, Image, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import colors from '../../../common/constant/colors';
import images from '../../../common/constant/images';
import { height } from '../../../common/constant/size';

// create a component
const CommonTextField = ({
  color,
  placeholder,
  onChange,
  styles,
  error,
  rightIcon,
  rightIconOnPress,
  ...otherProps
}) => {
  return (
    <Box justifyContent="flex-start" w="100%">
      {/* <View style={{ ...style.photoShadow, backgroundColor: color }} /> */}
      <ImageBackground
        source={images.textAreaPink}
        style={style.imageStyle}
        resizeMode="stretch"
        resizeMethod="resize">
        <TextInput
          style={{ ...style.input, borderColor: color }}
          placeholder={placeholder}
          onChangeText={onChange}
          activeUnderlineColor={colors.primary}
          underlineStyle={{ backgroundColor: 'transparent' }}
          right={<TextInput.Icon icon={rightIcon} color="red" onPress={rightIconOnPress} />}
          {...otherProps}
        />
      </ImageBackground>

      {error ? (
        <Text alignSelf="flex-start" color={colors.error} pl={2} pt={2}>
          {error}
        </Text>
      ) : null}
    </Box>
  );
};

// define your styles
const style = StyleSheet.create({
  input: {
    fontSize: 14,
    color: '#000000',
    width: '100%',
    height: height * 0.025,
    marginBottom: 5,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  photoShadow: {
    position: 'absolute',
    width: '100%',
    height: height * 0.065,
    borderRadius: 8,
    left: 6,
    top: 8,
  },
  imageStyle: {
    padding: 12,
  },
});

CommonTextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  styles: PropTypes.any,
  error: PropTypes.string,
  otherProps: PropTypes.object,
  rightIcon: PropTypes.string,
  rightIconOnPress: PropTypes.func,
};

//make this component available to the app
export default CommonTextField;
