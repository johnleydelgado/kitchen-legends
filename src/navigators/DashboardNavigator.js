import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { Center, Pressable, View } from 'native-base';
import React from 'react';
import Icons from 'react-native-vector-icons/Feather';

import colors from '../common/constant/colors';
import { MAIN, STACKS, TABS } from '../common/constant/screens';
import { AboutScreen, DashboardScreen, LeaderBoardScreen, ProfileScreen } from '../screens';
// import DashboardNavigator from "./DashboardNavigator";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View
      key={state.index}
      backgroundColor="white"
      style={{
        position: 'absolute',
        bottom: 16,
        padding: 16,
        zIndex: 1,
        elevation: 3,
        flexDirection: 'row',
        height: 72,
        borderRadius: 75,
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '90%',
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          // if (route.name == 'Payment') {
          //   Alert.alert('Feature Coming Soon!')
          // }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        let iconName;

        switch (route.name) {
          case TABS.DASHBOARD:
            iconName = isFocused ? 'home' : 'home';
            break;
          case TABS.LEADER_BOARD:
            iconName = isFocused ? 'bar-chart-2' : 'bar-chart-2';
            break;
          case TABS.ABOUT:
            iconName = isFocused ? 'help-circle' : 'help-circle';
            break;
          case TABS.PROFILE:
            iconName = isFocused ? 'user' : 'user';
            break;
          default:
            iconName = isFocused ? 'home' : 'home';
        }
        return (
          <Pressable key={index} onPress={onPress} rounded="8" maxW="96">
            <Center
              bg={isFocused ? 'orange' : null}
              style={{
                width: 80,
                height: 40,
                borderRadius: 32,
              }}>
              <Icons name={iconName} size={24} color={isFocused ? '#ef476f' : colors.subtleText} />
            </Center>
          </Pressable>
        );
      })}
    </View>
  );
}

const DashboardNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name={TABS.DASHBOARD}
        component={DashboardStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={TABS.LEADER_BOARD}
        component={LeaderBoardStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name={TABS.ABOUT} component={AboutStack} options={{ headerShown: false }} />
      <Tab.Screen name={TABS.PROFILE} component={ProfileStack} options={{ headerShown: false }} />

      {/* <Tab.Screen
        name={TABS.PROFILE}
        // component={ProfileStack}
        options={({ route }) => ({ headerShown: false })}
      /> */}
    </Tab.Navigator>
    // <Stack.Navigator
    //   screenOptions={{
    //     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    //     headerShown: false,
    //   }}
    //   // initialRouteName={isLoggedIn ? MAIN.DASHBOARD : MAIN.ONBOARDING}
    // >
    //   <Stack.Screen name={MAIN.DASHBOARD} component={DashboardScreen} />
    // </Stack.Navigator>
  );
};

const DashboardStack = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const tabHiddenRoutes = [STACKS.MEETING, 'Map'];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={STACKS.DASHBOARD} component={DashboardScreen} />
    </Stack.Navigator>
  );
};

const LeaderBoardStack = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const tabHiddenRoutes = [STACKS.MEETING, 'Map'];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={STACKS.LEADER_BOARD} component={LeaderBoardScreen} />
    </Stack.Navigator>
  );
};

const AboutStack = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const tabHiddenRoutes = [STACKS.MEETING, 'Map'];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={STACKS.ABOUT} component={AboutScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const tabHiddenRoutes = [STACKS.MEETING, 'Map'];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={STACKS.PROFILE_SCREEN} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
