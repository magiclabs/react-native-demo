import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Magic } from '@magic-sdk/react-native-bare'
import { OAuthExtension } from "@magic-ext/react-native-bare-oauth";
import Web3 from 'web3'
import { ENV, API_KEY } from './config/env';
import { BitcoinExtension } from "@magic-ext/bitcoin";
import { GDKMSExtension } from "@magic-ext/gdkms";
import { AuthExtension } from "@magic-ext/auth";

export default function App() {
  const colorScheme = useColorScheme();

  const [env, setEnv] = React.useState(ENV.PROD);

  const magic = new Magic(API_KEY[env], {
    extensions: [
      new OAuthExtension(),
      new AuthExtension(),
      new GDKMSExtension(),
      new BitcoinExtension({
        rpcUrl: 'BTC_RPC_NODE_URL',
        network: 'testnet' // testnet or mainnet
      })
    ],
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
      <magic.Relayer />
      <Navigation colorScheme={colorScheme} magicProps={magicProps} />
    </SafeAreaProvider>
  )
}
