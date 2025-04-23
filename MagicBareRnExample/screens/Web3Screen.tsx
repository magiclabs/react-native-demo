import React, {useCallback} from 'react';
import {Button, TextInput, Text, View, Alert} from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Card } from 'react-native-paper';
import "../shim"; // Required for Bitcoin Blockchain interaction

export default function Web3Screen(props: { web3: any; magic: any }) {
  const [publicAddress, updatePublicAddress] = React.useState('');
  const [toAddress, onChangeToAddress] = React.useState('YOUR_PUBLIC_TO_ADDRESS');
  const [transactionHash, updateTransactionHash] = React.useState('');
  const [ciphertexts, setCiphertexts] = React.useState('');


  const { web3, magic } = props;

  React.useEffect(() => {
  }, []);

  /** GetAccount */
  const getAccount = async () => {
    try {
      const account = await web3.eth.getAccounts();
      updatePublicAddress(account[0]);
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
      const accounts = await web3.eth.getAccounts();
      const text = 'hello world';

      console.log('accounts', accounts);

      const payload = {
        id: 1,
        method: 'personal_sign',
        params: [text, accounts[0]],
      };

      console.log(magic.rpcProvider);

      magic.rpcProvider.sendAsync(payload, (err, response) => {
        Alert.alert(response.result);
        if (err) {
          console.error(err);
          return;
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  /** sendTransaction */
  const sendTransaction = async () => {
    const hash = await web3.eth.sendTransaction({
      from: publicAddress,
      to: publicAddress,
      value: web3.utils.toWei('0.1', 'ether')
    });
    updateTransactionHash(hash.transactionHash);
  };

  /** ShowWallet */
  const showWallet = async () => {
    try {
      await magic.wallet.showUI();
    } catch (e) {
      Alert.alert(e);
    }
  };

  /** getWalletInfo */
  const getWalletInfo = async () => {
    try {
      const walletInfo = await magic.wallet.getInfo();
      Alert.alert(`WalletType: ${walletInfo.walletType}`);
    } catch (e) {
      Alert.alert(e);
    }
  };

  /** requestUserInfo */
  const requestUserInfo = async () => {
    try {
      const email = await magic.wallet.requestUserInfoWithUI();
      Alert.alert(`email: ${email}`);
    } catch (e) {
      Alert.alert(e);
    }
  };

  /** disconnect */
  const disconnect = async () => {
    await magic.wallet.disconnect().catch((e) => {
      Alert.alert(`error: ${e}`);
    });
    Alert.alert("Magic Disconnect Successful");
  };

  /**
   * GDKMS
   */
  const encrypt = async () => {
    const ciphertexts = await magic.gdkms.encryptWithPrivateKey('asdf');
    Alert.alert(ciphertexts);
    setCiphertexts(ciphertexts);
  }

  const decrypt = useCallback(async () => {
    const message = await magic.gdkms.decryptWithPrivateKey(ciphertexts);
    Alert.alert(message);
  }, [ciphertexts]);

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
                  <Button onPress={() => decrypt()} title="Decrypt" />
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
              {/* Request User Info */}
              <Card>
                <Card.Title title="Request User Info" />
                <View style={styles.actionContainer}>
                  <Button onPress={() => requestUserInfo()} title="Request User Info" />
                </View>
              </Card>
              {/* Disconnect Wallet */}
              <Card>
                <Card.Title title="Disconnect Wallet" />
                <View style={styles.actionContainer}>
                  <Button onPress={() => disconnect()} title="Disconnect Wallet" />
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


