import React from 'react';
import { BottomTabNavigator } from './navigation';
import { Magic } from '@magic-sdk/react-native'
import Web3 from 'web3'
import { ENV, API_KEY, MGBOX_ENDPOINT } from './config/env';
import {SafeAreaView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {

  const [env, setEnv] = React.useState(ENV.PROD);

  const magic = new Magic(API_KEY[env]);

  const web3 = new Web3(magic.rpcProvider);

  const magicProps = {
    magic,
    web3,
    setEnv,
    env
  }

    return (
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <BottomTabNavigator {...magicProps} />
          </NavigationContainer>
          <magic.Relayer/>
        </SafeAreaView>
    );
}
