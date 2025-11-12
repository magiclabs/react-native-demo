import { Magic } from '@magic-sdk/react-native-bare';
import { OAuthExtension } from '@magic-ext/react-native-bare-oauth';
import { SolanaExtension } from '@magic-ext/solana';
import { EVMExtension } from '@magic-ext/evm';
import { ethers } from 'ethers';

// API Key - Replace with your actual publishable key
const API_KEY = 'YOUR_PUBLISHABLE_KEY';

const customPolygonOptions = {
  rpcUrl: 'https://polygon-rpc.com/', // Polygon RPC URL
  chainId: 137, // Polygon chain id
  default: true, // Set as default network
};

const customOptimismOptions = {
  rpcUrl: 'https://mainnet.optimism.io',
  chainId: 10,
};

class MagicService {
  private static _magic: any = null;
  private static _provider: ethers.BrowserProvider | null = null;

  public static get magic(): any {
    if (!this._magic) {
      this._magic = new Magic(API_KEY, {
        extensions: [
          new OAuthExtension(),
          new SolanaExtension({
            rpcUrl: 'https://api.devnet.solana.com',
          }),
          new EVMExtension([customPolygonOptions, customOptimismOptions]),
        ],
      });
    }
    return this._magic;
  }

  public static get provider(): ethers.BrowserProvider {
    if (!this._provider) {
      this._provider = new ethers.BrowserProvider(
        MagicService.magic.rpcProvider as any
      );
    }
    return this._provider;
  }
}

// React hook to use Magic service
export function useMagic() {
  return {
    magic: MagicService.magic,
    provider: MagicService.provider,
  };
}
