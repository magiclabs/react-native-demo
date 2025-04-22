import React, { useCallback } from 'react';
import { Button, TextInput, Text, View, Alert } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { ethers } from 'ethers';
import { styles } from '../../styles/styles';
import { useMagic } from '@/hooks/useMagic';

export default function Web3Screen() {
    const [publicAddress, updatePublicAddress] = React.useState('');
    const [toAddress, onChangeToAddress] = React.useState('YOUR_PUBLIC_TO_ADDRESS');
    const [transactionHash, updateTransactionHash] = React.useState('');
    const [ciphertexts, setCiphertexts] = React.useState('');
    const { magic, provider } = useMagic(); // provider is an ethers Web3Provider

    /** GetAccount */
    const getAccount = async () => {
        try {
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            updatePublicAddress(address);
        } catch (e) {
            console.error(e);
            updatePublicAddress('');
        }
    };

    /** personalSign() */
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
    };

    /** sendTransaction */
    const sendTransaction = async () => {
        try {
            const signer = await provider.getSigner();
            const tx = await signer.sendTransaction({
                from: publicAddress,
                to: toAddress,
                value: ethers.parseEther('0.1'),
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
            Alert.alert(`Wallet Type: ${walletInfo.walletType}`);
        } catch (e) {
            Alert.alert('Error', (e as Error).message);
        }
    };

    return (
        <View style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Card>
                        {/* Send Transaction */}
                        <Card.Title title="Send Transaction" />
                        <View style={styles.loginContainer}>
                            <Text>To:</Text>
                            <TextInput
                                style={styles.TextInputContainer}
                                onChangeText={onChangeToAddress}
                                value={toAddress}
                            />
                            <Text style={styles.publicAddress}>Transaction Hash: {transactionHash}</Text>
                        </View>
                        <View style={styles.actionContainer}>
                            <Button onPress={sendTransaction} title="Send" />
                        </View>
                    </Card>

                    {/* Get Account */}
                    <Card>
                        <Card.Title title="Get Account" />
                        <View style={styles.loginContainer}>
                            <Text style={styles.publicAddress}>Public Address: {publicAddress}</Text>
                        </View>
                        <View style={styles.actionContainer}>
                            <Button onPress={getAccount} title="Get Account" />
                        </View>
                    </Card>

                    {/* Personal Sign */}
                    <Card>
                        <Card.Title title="Personal Sign" />
                        <View style={styles.actionContainer}>
                            <Button onPress={personalSign} title="Personal Sign" />
                        </View>
                    </Card>
                </ScrollView>
            </GestureHandlerRootView>

            {/* Magic Connect */}
            <Card>
                <Card.Title title="Magic Connect" />
                <View style={styles.actionContainer}>
                    <Button onPress={showWallet} title="Show Wallet" />
                </View>
                <View style={styles.actionContainer}>
                    <Button onPress={getWalletInfo} title="Get Wallet Info" />
                </View>
            </Card>
        </View>
    );
}
