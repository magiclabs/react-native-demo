
import {Magic} from "@magic-sdk/react-native-expo";
import {API_KEY} from "@/constants/env";
import {OAuthExtension} from "@magic-ext/react-native-expo-oauth";
import {ethers} from "ethers/lib.esm";
import { useMemo } from "react";

export function useMagic() {

    const magic = useMemo(() => {
        return new Magic(API_KEY, {
            extensions: [new OAuthExtension()],
        });
    }, []);

    const provider = new ethers.BrowserProvider(magic.rpcProvider as any);

    return {
        magic,
        provider
    };
}
