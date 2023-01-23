import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Magic } from '@magic-sdk/react-native-bare'
import { OAuthExtension } from "@magic-ext/react-native-bare-oauth";
import Web3 from 'web3'
import { ENV, API_KEY } from './config/env';
/** 
 * For Magic Connect API Keys Only
 * import { ConnectExtension } from '@magic-ext/connect';
*/

export default function App() {
  const colorScheme = useColorScheme();

  const [env, setEnv] = React.useState(ENV.PROD);

  const magic = new Magic(API_KEY[env], {
    extensions: [new OAuthExtension()], // Magic Connect API Keys add 'new ConnectExtension()' here
  });

  const web3 = new Web3(magic.rpcProvider);

  const magicProps = {
    magic,
    web3,
    setEnv,
    env
  }

  return (
  <SafeAreaProvider>
    <magic.Relayer/>
    <Navigation colorScheme={colorScheme} magicProps={magicProps} />
  </SafeAreaProvider>
  )
}
