import { Magic } from '@magic-sdk/react-native-bare';
import { OAuthExtension } from '@magic-ext/react-native-bare-oauth';
import { SolanaExtension } from "@magic-ext/solana";
import { EVMExtension } from "@magic-ext/evm";
import { API_KEY } from '../config/env';

const customPolygonOptions = {
  rpcUrl: "https://polygon-rpc.com/", // Polygon RPC URL
  chainId: 137, // Polygon chain id
  default: true, // Set as default network
};

const customOptimismOptions = {
  rpcUrl: "https://mainnet.optimism.io",
  chainId: 10,
};

/**
 * MagicService - Singleton service for managing Magic SDK instances
 * 
 * This service provides a centralized way to access Magic SDK
 * across your application with lazy initialization.
 * 
 * Usage:
 * ```
 * const magic = MagicService.magic;
 * ```
 */
export class MagicService {
  private static _magic: any | null = null;

  /**
   * Get the Magic SDK instance. Creates one if it doesn't exist.
   */
  public static get magic(): Magic {
    if (!this._magic) {
      const extensions: any[] = [
        new OAuthExtension(),
        new SolanaExtension({
          rpcUrl: "https://api.devnet.solana.com",
        }),
        new EVMExtension([customPolygonOptions, customOptimismOptions]),
      ];

      this._magic = new Magic(API_KEY.PROD, {
        extensions,
      });
    }
    return this._magic;
  }
}

