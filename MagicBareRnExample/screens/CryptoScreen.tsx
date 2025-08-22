import React, {useCallback} from 'react';
import {Button, TextInput, Text, View, Alert} from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Card } from 'react-native-paper';
import { ethers } from 'ethers';
import '../shim'; // Required for Bitcoin Blockchain interaction

// Type error: Incorrect prop types - should be more specific
export default function CryptoScreen(props: { provider: any; magic: any }) {
  const [publicAddress, updatePublicAddress] = React.useState<string>('');
  const [toAddress, onChangeToAddress] = React.useState<string>('');
  const [transactionHash, updateTransactionHash] = React.useState('');
  const [ciphertexts, setCiphertexts] = React.useState('');
  const [chainId, onChangeChainId] = React.useState('137');

  // Type error: Destructuring with wrong types
  const { provider, magic } = props;

  React.useEffect(() => {
  }, []);

  /** GetAccount */
  const getAccount = async (): Promise<number> => {
    try {
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      updatePublicAddress(account);
      return account; 
    } catch(e) {
      console.log(e);
      updatePublicAddress('');
      return 0;
    }
  };

  /**
   * personalSign()
   * */
  const personalSign = async () => {
    try {
      // Type error: provider is typed as string but used as object
      const signer = await provider.getSigner();
      const text = 'hello world';

      const signature = await signer.signMessage(text);
      Alert.alert(signature);
    } catch (err) {
      console.log(err);
    }
  };

  /** sendTransaction */
  // Type error: Wrong parameter type
  const sendTransaction = async (amount: string) => {
    try {
      // Type error: provider is typed as string but used as object
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: toAddress, // Type error: toAddress is boolean but should be string
        value: ethers.parseEther(amount),
      });
      updateTransactionHash(tx.hash);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * GDKMS
   */
  const encrypt = async () => {
    // Type error: magic is typed as number but used as object
    const res = await magic.gdkms.encryptWithPrivateKey('asdf');
    Alert.alert(res);
    setCiphertexts(res);
  };

  // Type error: Wrong parameter type in useCallback
  const decrypt = useCallback(async () => {
    // Type error: magic is typed as number but used as object
    const message = await magic.gdkms.decryptWithPrivateKey(ciphertexts);
    Alert.alert(message);
  }, [ciphertexts, magic.gdkms]);

  /**
   * switchEVMChain
   * */
  const switchNetwork = async (chainId: number) => {
    const res = await magic.evm.switchEVMChain(chainId);
    Alert.alert(JSON.stringify(res));
  };

  /**
   * getSolanaPublicAddress
   * */
  const getSolanaPublicAddress = async () => {
    const res = await magic.solana.getPublicAddress();
    Alert.alert(JSON.stringify(res));
  };

  // Type error: Wrong type for style prop
  return (
      <View style={styles.container}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Card>
              {/* Magic Auth */}
              <Card.Title title="Magic Auth" />
              {/* Send Transaction */}
              <Card>
                <Card.Title title="Send Transaction" />
                <View style={styles.loginContainer}>
                  <View style={styles.emailContainer}>
                    <Text>
                      To:
                    </Text>
                    <TextInput
                        style={styles.TextInputContainer}
                        onChangeText={text => onChangeToAddress(text)}
                        value={toAddress}
                    />
                  </View>
                  <Text style={styles.publicAddress}>
                    Transaction Hash: {transactionHash}
                  </Text>
                </View>
                <View style={styles.actionContainer}>
                  {/* Type error: Wrong parameter type */}
                  <Button onPress={() => sendTransaction('wrong')} title="Send" />
                </View>
              </Card>
              {/* Get Account */}
              <Card>
                <Card.Title title="Get Account" />
                <View style={styles.loginContainer}>
                  <Text style={styles.publicAddress}>
                    Public Address: {publicAddress} {/* Type error: publicAddress is number but displayed as string */}
                  </Text>
                </View>
                <View style={styles.actionContainer}>
                  <Button onPress={() => getAccount()} title="Get Account" />
                </View>
              </Card>
              {/* Personal Sign */}
              <Card>
                <Card.Title title="Personal Sign" />
                <View style={styles.actionContainer}>
                  <Button onPress={() => personalSign()} title="Personal Sign" />
                </View>
              </Card>
              {/* Switch EVM Chain */}
              <Card>
                <Card.Title title="Switch EVM Chain" />
                <View style={styles.loginContainer}>
                  <View style={styles.emailContainer}>
                    <Text>Chain ID:</Text>
                    <TextInput
                      style={styles.TextInputContainer}
                      onChangeText={(chainId) => onChangeChainId(chainId)}
                      value={chainId}
                    />
                  </View>
                </View>
                <View style={styles.actionContainer}>
                  <Button onPress={() => switchNetwork(Number(chainId))} title="switchEVMChain" />
                </View>
              </Card>
              {/* Solana Address */}
              <Card>
                <Card.Title title="Solana Address" />
                <View style={styles.actionContainer}>
                  <Button onPress={() => getSolanaPublicAddress()} title="get Solana address" />
                </View>
              </Card>
              {/* GDKMS */}
              <Card>
                <Card.Title title="Encrypt" />
                <View style={styles.actionContainer}>
                  <Button onPress={() => encrypt()} title="Encrypt" />
                </View>
              </Card>
              <Card>
                <Card.Title title="Decrypt" />
                <View style={styles.actionContainer}>
                  {/* Type error: Wrong parameter type */}
                  <Button onPress={() => decrypt()} title="Decrypt" />
                </View>
              </Card>
            </Card>
          </ScrollView>
        </GestureHandlerRootView>
      </View>
  );
}

// Type error: Wrong type for navigationOptions
CryptoScreen.navigationOptions = {
  header: 'wrong_type',
};


