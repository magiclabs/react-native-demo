import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import Navigation from './navigation';
import { SolanaExtension } from "@magic-ext/solana";
import { EVMExtension } from "@magic-ext/evm";
import { Magic } from '@magic-sdk/react-native-bare';
import { OAuthExtension } from '@magic-ext/react-native-bare-oauth';
import Web3 from 'web3';
import { ENV, API_KEY } from './config/env';
import { GDKMSExtension } from '@magic-ext/gdkms';

const customPolygonOptions = {
  rpcUrl: "https://polygon-rpc.com/", // Polygon RPC URL
  chainId: 137, // Polygon chain id
  default: true, // Set as default network
};

const customOptimismOptions = {
  rpcUrl: "https://mainnet.optimism.io",
  chainId: 10,
};

export default function App() {

    const [env, setEnv] = React.useState(ENV.PROD);

    const magic = new Magic(API_KEY[env], {
        extensions: [
            new OAuthExtension(),
            new GDKMSExtension(),
            new SolanaExtension({
              rpcUrl: "https://api.devnet.solana.com",
            }),
            new EVMExtension([customPolygonOptions, customOptimismOptions]),
          ],
    });

    const web3 = new Web3(magic.rpcProvider as any);

    const magicProps = {
        magic,
        web3,
        setEnv,
        env,
    };

    return (
        <SafeAreaProvider>
            <Navigation  magicProps={magicProps} />
          <magic.Relayer />
        </SafeAreaProvider>
    );
}
