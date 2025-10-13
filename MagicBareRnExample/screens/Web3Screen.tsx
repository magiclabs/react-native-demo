import React from 'react';
import {Button, TextInput, Text, View, Alert} from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Card } from 'react-native-paper';
import { MagicService } from '../hooks/magic';
import { ethers } from 'ethers';
import "../shim"; // Required for Bitcoin Blockchain interaction

export default function Web3Screen() {
  const [publicAddress, updatePublicAddress] = React.useState('');
  const [toAddress, onChangeToAddress] = React.useState('YOUR_PUBLIC_TO_ADDRESS');
  const [transactionHash, updateTransactionHash] = React.useState('');

  const magic = MagicService.magic;
  const provider = new ethers.BrowserProvider(magic.rpcProvider);

  React.useEffect(() => {
  }, []);

  /** GetAccount */
  const getAccount = async () => {
    try {
      const res = await magic.user.getInfo();
      const address = res.publicAddress || '';
      updatePublicAddress(address);
    } catch(e) {
      console.log(e)
      updatePublicAddress('');
    }
  };

  /**
   * personalSign()
   * */
  const personalSign = async () => {
    try {
      const signer = await provider.getSigner();
      const text = 'hello world';
      const signature = await signer.signMessage(text);
      Alert.alert('Signature', signature);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', (err as Error).message);
    }
  }

  /** sendTransaction */
  const sendTransaction = async () => {
    try {
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther('0.01'),
      });
      updateTransactionHash(tx.hash);
    } catch (err) {
      console.error(err);
      Alert.alert('Transaction Error', (err as Error).message);
    }
  };

  /** ShowWallet */
  const showWallet = async () => {
    try {
      await magic.wallet.showUI();
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    }
  };

  /** getWalletInfo */
  const getWalletInfo = async () => {
    try {
      const walletInfo = await magic.user.getInfo();
      Alert.alert(`WalletType: ${walletInfo.walletType}`);
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    }
  };






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
                  <Button onPress={() => sendTransaction()} title="Send" />
                </View>
              </Card>
              {/* Get Account */}
              <Card>
                <Card.Title title="Get Account" />
                <View style={styles.loginContainer}>
                  <Text style={styles.publicAddress}>
                    Public Address: {publicAddress}
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
              
            </Card>
            <Card>
              {/* Magic Connect */}
              <Card.Title title="Magic Connect" />
              {/* Show Wallet */}
              <Card>
                <Card.Title title="Show Wallet" />
                <View style={styles.actionContainer}>
                  <Button onPress={() => showWallet()} title="Show Wallet" />
                </View>
              </Card>
              {/* Get Wallet Info */}
              <Card>
                <Card.Title title="Get Wallet Info" />
                <View style={styles.actionContainer}>
                  <Button onPress={() => getWalletInfo()} title="Get Wallet Info" />
                </View>
              </Card>
              
            </Card>
          </ScrollView>
        </GestureHandlerRootView>
      </View>
  );
}



Web3Screen.navigationOptions = {
  header: null,
};


