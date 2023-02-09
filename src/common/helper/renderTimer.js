import { Text } from 'native-base';

const renderTimer = ({ remainingTime }) => {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
    <Text
      fontWeight="600"
      fontSize="14"
      color="black"
      accessibilityRole="timer"
      accessibilityLiveRegion="assertive"
      importantForAccessibility="yes">
      {minutes}:{seconds}
    </Text>
  );
};

export { renderTimer };
