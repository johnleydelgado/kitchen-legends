import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { width } from '../../../../../common/constant/size';
export default function useAnimation() {
  const offset = useSharedValue(width / 2);

  const animatedStyleDefault = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const playerSettingsHandler = () => {
    offset.value = withSpring(!offset.value ? width / 2 : 0, {
      damping: 9,
      mass: 0.1,
      stiffness: 100,
      restDisplacementThreshold: 0.1,
    });
  };

  return { playerSettingsHandler, animatedStyleDefault };
}
