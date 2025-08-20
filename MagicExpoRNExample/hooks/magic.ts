import { Magic } from "@magic-sdk/react-native-expo";
import { OAuthExtension } from "@magic-ext/react-native-expo-oauth";
import { SolanaExtension } from "@magic-ext/solana";
import { EVMExtension } from "@magic-ext/evm";
import { ethers } from "ethers";
import { API_KEY } from "@/constants/env";

const customPolygonOptions = {
  rpcUrl: "https://polygon-rpc.com/", // Polygon RPC URL
  chainId: 137, // Polygon chain id
  default: true, // Set as default network
};

const customOptimismOptions = {
  rpcUrl: "https://mainnet.optimism.io",
  chainId: 10,
};

export class MagicService {
  private static _magic: Magic | null = null;
  private static _provider: ethers.BrowserProvider | null = null;

  public static get magic(): Magic {
    if (!this._magic) {
      this._magic = new Magic(API_KEY, {
        extensions: [
          new OAuthExtension(),
          new SolanaExtension({
            rpcUrl: "https://api.devnet.solana.com",
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
        // cast as any if necessary; Magic’s rpcProvider type is slightly different
        MagicService.magic.rpcProvider as any
      );
    }
    return this._provider;
  }
}
