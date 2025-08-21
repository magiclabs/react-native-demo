/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/LoginScreen';
import Web3Screen from '../screens/Web3Screen';
import { RootStackParamList, RootTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HeaderDropdown from './HeaderDropdown';
import { JSX } from 'react';

Icon.loadFont();

export default function Navigation({ magicProps }: { magicProps: any  }) {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}>
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

function BottomTabNavigator(props: { navigation?: any; env?: any; setEnv?: any; magic?: any; provider?: any; }) {

    const { env, setEnv, magic, provider } = props;

    const header = () => <HeaderDropdown
        env={env}
        setEnv={setEnv}
    />;

  return (
    <BottomTab.Navigator
      initialRouteName="Login">
      <BottomTab.Screen
        name="Login"
        options={() => ({
          headerShown: false,
          title: 'Login',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      >
          {() => TabOneNavigator(header, magic, provider)}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Web3"
        options={{
          title: 'Web3',
            headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      >
          {() => TabTwoNavigator(header, provider, magic)}
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

function TabOneNavigator(header: () => JSX.Element, magic: any, provider: any) {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="LoginScreen"
                options={{ headerTitle: header }}
            >
                {props => <LoginScreen {...props} magic={magic} provider={provider} />}
            </TabOneStack.Screen>
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createNativeStackNavigator<TabTwoParamList>();

function TabTwoNavigator(header: () => JSX.Element, provider: any, magic: any) {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="Web3Screen"
                options={{ headerTitle: header }}
            >
                {(props: any) => <Web3Screen {...props} provider={provider} magic={magic}/>}
            </TabTwoStack.Screen>
        </TabTwoStack.Navigator>
    );
}
