import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Magic } from '@magic-sdk/react-native-bare'
import { OAuthExtension } from "@magic-ext/react-native-bare-oauth";
import Web3 from 'web3'
import { ENV, API_KEY } from './config/env';
import { AlgorandExtension } from "@magic-ext/algorand";
import { SolanaExtension } from "@magic-ext/solana";
import { BitcoinExtension } from "@magic-ext/bitcoin";

const magicAlgorand = new Magic("pk_live_A06C92A36D69F9DF", {
  endpoint: "http://192.168.1.219:3016",
  extensions: {
    algorand: new AlgorandExtension({
      rpcUrl: ""
    })
  }
});

const magicBitcoin = new Magic("pk_live_A06C92A36D69F9DF", {
  endpoint: "http://192.168.1.219:3016",
  extensions: [
    new BitcoinExtension({
      rpcUrl: "BTC_RPC_NODE_URL",
      network: "testnet"
    })
  ]
});

const magicSolana = new Magic("pk_live_A06C92A36D69F9DF", {
  endpoint: "http://192.168.1.219:3016",
  extensions: {
    solana: new SolanaExtension({
      rpcUrl: "https://api.devnet.solana.com"
    })
  }
});

export const MAGICS = {
  solana: magicSolana,
  bitcoin: magicBitcoin,
  algorand: magicAlgorand
};

export default function App() {
  const colorScheme = useColorScheme();

  const [env, setEnv] = React.useState("solana");

  const magic = MAGICS[env]

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
