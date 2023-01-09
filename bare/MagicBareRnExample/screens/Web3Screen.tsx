import React from 'react';
import { Button, TextInput, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Card } from 'react-native-elements';

export default function Web3Screen (props: { web3: any; }) {
  const [publicAddress, updatePublicAddress] = React.useState('');
  const [toAddress, onChangeToAddress] = React.useState('YOUR_PUBLIC_TO_ADDRESS');
  const [transactionHash, updateTransactionHash] = React.useState('');

  const { web3 } = props;

  React.useEffect( () => {
  }, []);

  /** GetAccount */
  const getAccount = async () => {
    try {
      const account = await web3.eth.getAccounts();
      updatePublicAddress(account[0]);
    } catch {
      updatePublicAddress('');
    }
  };

  /** sendTransaction */
  const sendTransaction = async () => {
    const hash = await web3.eth.sendTransaction({
      from: publicAddress,
      to: publicAddress,
      value: web3.utils.toWei('0.1', 'ether')
    });
    updateTransactionHash(hash.transactionHash);
  };

  return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          {/* Get Account */}
          <Card>
            <Card.Title>GetAccount</Card.Title>
            <View style={styles.loginContainer}>
              <Text style={styles.publicAddress}>
                Public Address: {publicAddress}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <Button onPress={() => getAccount()}  title="Get Account" />
            </View>
          </Card>


          {/* Send Transaction section */}
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
              <Button onPress={() => sendTransaction()}  title="Send" />
            </View>
          </Card>
        </ScrollView>
      </View>
  );
}



Web3Screen.navigationOptions = {
  header: null,
};


