/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import NotFoundScreen from '../screens/NotFoundScreen';
import useColorScheme from '../hooks/useColorScheme';
import LoginScreen from '../screens/LoginScreen';
import Web3Screen from '../screens/Web3Screen';
import { RootStackParamList, RootTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HeaderDropdown from "./HeaderDropdown";

Icon.loadFont();

export default function Navigation({ colorScheme, magicProps }: { colorScheme: ColorSchemeName, magicProps: any  }) {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator magicProps={magicProps}/>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ magicProps }: any) {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Root" options={{ headerShown: false }} >
            {() => BottomTabNavigator(magicProps)}
        </Stack.Screen>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator(props: { navigation?: any; env?: any; setEnv?: any; magic?: any; web3?: any; }) {
  const colorScheme = useColorScheme();

    const { env, setEnv, magic, web3 } = props;

    const header = () => <HeaderDropdown
        env={env}
        setEnv={setEnv}
    />

  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Login"
        options={() => ({
          headerShown: false,
          title: 'Login',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      >
          {() => TabOneNavigator(header, magic)}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Web3"
        options={{
          title: 'Web3',
            headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      >
          {() => TabTwoNavigator(header, web3)}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>['name'];
  color: string;
}) {
  return <Icon size={30} style={{ marginBottom: -3 }} {...props} />;
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
