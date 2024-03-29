import React, {useCallback} from 'react';
import { Button, TextInput, Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Card } from 'react-native-elements';
import "../shim"; // Required for Bitcoin Blockchain interaction
import * as bitcoin from 'bitcoinjs-lib';

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
        alert(response.result);
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

  /** signBTCTransaction */
  const signBTCTransaction = async () => {
    const TESTNET = bitcoin.networks.testnet;
    const tx = new bitcoin.TransactionBuilder(TESTNET);

    tx.addInput('fde789dad13b52e33229baed29b11d3e6f6dd306eb159865957dce13219bf85c', 0);
    tx.addOutput('mfkv2a593E1TfDVFmf1szjAkyihLowyBaT', 80000);

    const txHex = tx.buildIncomplete().toHex();
    const signedTransactionHex = await magic.bitcoin.signTransaction(txHex, 0);

    alert(`signed transaction - ${signedTransactionHex}`);
  };

  /** ShowWallet */
  const showWallet = async () => {
    try {
      await magic.wallet.showUI();
    } catch (e) {
      alert(e);
    }
  };

  /** getWalletInfo */
  const getWalletInfo = async () => {
    try {
      const walletInfo = await magic.wallet.getInfo();
      alert(`WalletType: ${walletInfo.walletType}`);
    } catch (e) {
      alert(e);
    }
  };

  /** requestUserInfo */
  const requestUserInfo = async () => {
    try {
      const email = await magic.wallet.requestUserInfoWithUI();
      alert(`email: ${email}`);
    } catch (e) {
      alert(e);
    }
  };

  /** disconnect */
  const disconnect = async () => {
    await magic.wallet.disconnect().catch((e) => {
      alert(`error: ${e}`);
    });
    alert("Magic Disconnect Successful");
  };

  /**
   * GDKMS
   */
  const encrypt = async () => {
    const ciphertexts = await magic.gdkms.encryptWithPrivateKey('asdf');
    alert(ciphertexts);
    setCiphertexts(ciphertexts);
  }

  const decrypt = useCallback(async () => {
    const message = await magic.gdkms.decryptWithPrivateKey(ciphertexts);
    alert(message);
  }, [ciphertexts]);

  return (
      <View style={styles.container}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Card>
              {/* Magic Auth */}
              <Card.Title>Magic Auth</Card.Title>
              {/* Send Transaction */}
              <Card>
                <Card.Title>Send Transaction</Card.Title>
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
                <Card.Title>Get Account</Card.Title>
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
                <Card.Title>Personal Sign</Card.Title>
                <View style={styles.actionContainer}>
                  <Button onPress={() => personalSign()} title="Personal Sign" />
                </View>
              </Card>
              {/* Sign BTC Transaction */}
              <Card>
                <Card.Title>Sign BTC Transaction</Card.Title>
                <View style={styles.actionContainer}>
                  <Button onPress={() => signBTCTransaction()} title="Sign BTC Transaction" />
                </View>
              </Card>
              {/* GDKMS */}
              <Card>
                <Card.Title>Encrypt</Card.Title>
                <View style={styles.actionContainer}>
                  <Button onPress={() => encrypt()} title="Encrypt" />
                </View>
              </Card>
              <Card>
                <Card.Title>Decrypt</Card.Title>
                <View style={styles.actionContainer}>
                  <Button onPress={() => decrypt()} title="Decrypt" />
                </View>
              </Card>
            </Card>
            <Card>
              {/* Magic Connect */}
              <Card.Title>Magic Connect</Card.Title>
              {/* Show Wallet */}
              <Card>
                <Card.Title>Show Wallet</Card.Title>
                <View style={styles.actionContainer}>
                  <Button onPress={() => showWallet()} title="Show Wallet" />
                </View>
              </Card>
              {/* Get Wallet Info */}
              <Card>
                <Card.Title>Get Wallet Info</Card.Title>
                <View style={styles.actionContainer}>
                  <Button onPress={() => getWalletInfo()} title="Get Wallet Info" />
                </View>
              </Card>
              {/* Request User Info */}
              <Card>
                <Card.Title>Request User Info</Card.Title>
                <View style={styles.actionContainer}>
                  <Button onPress={() => requestUserInfo()} title="Request User Info" />
                </View>
              </Card>
              {/* Disconnect Wallet */}
              <Card>
                <Card.Title>Disconnect Wallet</Card.Title>
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


