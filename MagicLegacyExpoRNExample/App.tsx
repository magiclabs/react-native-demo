import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Magic } from '@magic-sdk/react-native'
import Web3 from 'web3'
import { ENV, API_KEY } from './config/env';
import {OAuthExtension} from "@magic-ext/react-native-oauth";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [env, setEnv] = React.useState(ENV.PROD);

  const magic = new Magic(API_KEY[env], {
    extensions: [new OAuthExtension()],
    locale: "pl_en"
  });

  const web3 = new Web3(magic.rpcProvider);

  const magicProps = {
    magic,
    web3,
    setEnv,
    env
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <magic.Relayer/>
        <Navigation colorScheme={colorScheme} magicProps={magicProps} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
