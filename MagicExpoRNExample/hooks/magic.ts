
import { Magic } from '@magic-sdk/react-native-expo';
import { OAuthExtension } from '@magic-ext/react-native-expo-oauth';
import { ethers } from 'ethers';
import {API_KEY} from "@/constants/env";

export class MagicService {
    private static _magic: Magic | null = null;
    private static _provider: ethers.BrowserProvider | null = null;

    public static get magic(): Magic {
        if (!this._magic) {
            this._magic = new Magic(API_KEY, {
                extensions: [new OAuthExtension()],
            });
        }
        return this._magic;
    }

    public static get provider(): ethers.BrowserProvider {
        if (!this._provider) {
            this._provider = new ethers.BrowserProvider(
                // cast as any if necessary; Magic’s rpcProvider type is slightly different
                (MagicService.magic.rpcProvider as any)
            );
        }
        return this._provider;
    }
}
