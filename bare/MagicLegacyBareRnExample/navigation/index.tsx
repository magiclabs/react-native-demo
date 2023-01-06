/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import LoginScreen from '../screens/LoginScreen';
import Web3Screen from '../screens/Web3Screen';
import { RootTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import HeaderDropdown from "./HeaderDropdown";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator(props: { env?: any; setEnv?: any; magic?: any; web3?: any; }) {

    const { env, setEnv, magic, web3 } = props;

    const header = () => <HeaderDropdown
        env={env}
        setEnv={setEnv}
    />

  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
      }}>
      <BottomTab.Screen
        name="Login"
        options={() => ({
          headerShown: false,
          title: 'Login'
        })}
      >
          {() => TabOneNavigator(header, magic)}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Web3"
        options={{
          title: 'Web3',
            headerShown: false,
        }}
      >
          {() => TabTwoNavigator(header, web3)}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createNativeStackNavigator<TabOneParamList>();

function TabOneNavigator(header: () => JSX.Element, magic: any) {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="LoginScreen"
                options={{ headerTitle: header }}
            >
                {props => <LoginScreen {...props} magic={magic}/>}
            </TabOneStack.Screen>
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createNativeStackNavigator<TabTwoParamList>();

function TabTwoNavigator(header: () => JSX.Element, web3: any) {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="Web3Screen"
                options={{ headerTitle: header }}
            >
                {(props: any) => <Web3Screen {...props} web3={web3}/>}
            </TabTwoStack.Screen>
        </TabTwoStack.Navigator>
    );
}
