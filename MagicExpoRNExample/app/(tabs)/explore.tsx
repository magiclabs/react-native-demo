import React from 'react';
import { Button, TextInput, Text, View, Alert } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { ethers } from 'ethers';
import { styles } from '../../styles/styles';
import { useMagic } from "@/hooks/magic";

export default function CryptoScreen() {
    const [publicAddress, updatePublicAddress] = React.useState('');
    const [toAddress, onChangeToAddress] = React.useState('');
    const [transactionHash, updateTransactionHash] = React.useState('');
    const [ciphertexts, setCiphertexts] = React.useState('');
    const [chainId, setChainId] = React.useState('137');
    const [solanaAddress, setSolanaAddress] = React.useState('');
    const { magic, provider } = useMagic();

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
            if (!toAddress) {
                Alert.alert('Error', 'Please enter a recipient address');
                return;
            }
            
            const signer = await provider.getSigner();
            const tx = await signer.sendTransaction({
                to: toAddress,
                value: ethers.parseEther('0.001'),
            });
            updateTransactionHash(tx.hash);
            Alert.alert('Success', `Transaction sent: ${tx.hash}`);
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

    /**
     * switchEVMChain
     * */
    const switchNetwork = async (chainId: number) => {
        try {
            const res = await magic.evm.switchEVMChain(chainId);
            if (typeof res.network === 'string') {
                Alert.alert('Success', `Switched to ${res.network}`);
            } else {
                Alert.alert('Success', `Switched to chain ${res.network.chainId} and rpc url ${res.network.rpcUrl}`);
            }
            console.log('Switch result:', res);
        } catch (err) {
            console.log(err);
            Alert.alert('Error', `Failed to switch to chain ${chainId}`);
        }
    };

    /**
     * getSolanaPublicAddress
     * */
    const getSolanaPublicAddress = async () => {
        try {
            const res = await magic.solana.getPublicAddress();
            setSolanaAddress(res);
            Alert.alert('Solana Address', res);
        } catch (err) {
            console.log(err);
            Alert.alert('Error', 'Failed to get Solana address');
        }
    };

    /**
     * Solana Transaction
     */
    const sendSolanaTransaction = async () => {
        try {
            // Example Solana transaction
            const transaction = await magic.solana.createTransaction({
                to: solanaAddress || '11111111111111111111111111111111', // Default to system program
                value: '0.001', // SOL amount
            });
            
            const signature = await magic.solana.signTransaction(transaction);
            Alert.alert('Solana Transaction', `Signed: ${signature}`);
        } catch (err) {
            console.log(err);
            Alert.alert('Error', 'Failed to send Solana transaction');
        }
    };

    /**
     * GDKMS
     */
    const encrypt = async () => {
        try {
            const res = await magic.gdkms.encryptWithPrivateKey('asdf');
            Alert.alert('Encrypted', res);
            setCiphertexts(res);
        } catch (err) {
            console.log(err);
            Alert.alert('Error', 'Failed to encrypt');
        }
    };

    const decrypt = React.useCallback(async () => {
        try {
            if (!ciphertexts) {
                Alert.alert('Error', 'No ciphertext to decrypt');
                return;
            }
            const message = await magic.gdkms.decryptWithPrivateKey(ciphertexts);
            Alert.alert('Decrypted', message);
        } catch (err) {
            console.log(err);
            Alert.alert('Error', 'Failed to decrypt');
        }
    }, [ciphertexts, magic.gdkms]);

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
                                placeholder="Enter recipient address"
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

                    {/* Switch EVM Chain */}
                    <Card>
                        <Card.Title title="Switch EVM Chain" />
                        <View style={styles.loginContainer}>
                            <View style={styles.emailContainer}>
                                <Text>Chain ID:</Text>
                                <TextInput
                                    style={styles.TextInputContainer}
                                    onChangeText={(chainId) => setChainId(chainId)}
                                    value={chainId}
                                    placeholder="Enter chain ID"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View style={styles.actionContainer}>
                            <Button onPress={() => switchNetwork(Number(chainId))} title="Switch Chain" />
                        </View>
                    </Card>

                    {/* Solana */}
                    <Card>
                        <Card.Title title="Solana" />
                        <View style={styles.loginContainer}>
                            <Text style={styles.publicAddress}>
                                Solana Address: {solanaAddress}
                            </Text>
                        </View>
                        <View style={styles.actionContainer}>
                            <Button onPress={getSolanaPublicAddress} title="Get Solana Address" />
                            <Button onPress={sendSolanaTransaction} title="Send Solana Transaction" />
                        </View>
                    </Card>

                    {/* GDKMS */}
                    <Card>
                        <Card.Title title="Encrypt" />
                        <View style={styles.actionContainer}>
                            <Button onPress={encrypt} title="Encrypt" />
                        </View>
                    </Card>

                    <Card>
                        <Card.Title title="Decrypt" />
                        <View style={styles.actionContainer}>
                            <Button onPress={decrypt} title="Decrypt" />
                        </View>
                    </Card>
                </ScrollView>
            </GestureHandlerRootView>
        </View>
    );
}
