import React from "react";
import { TextInput, Text, View, Pressable, Alert } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { styles } from "../../styles/styles";
import { Card } from "react-native-paper";
import { DeepLinkPage } from "@magic-sdk/react-native-expo";
import { MagicService } from "@/hooks/magic";

export default function LoginScreen() {
  const [email, onChangeEmail] = React.useState("hiro@magic.link");
  const [chainId, onChangeChainId] = React.useState("137");
  const [recoveryEmail, onChangerecoveryEmail] =
    React.useState("hiro@magic.link");
  const [phoneNumber, onChangePhoneNumber] = React.useState("+18888888888");

  const magic = MagicService.magic;

  /**
   *Google sign in
   * */
  const magicGoogleSignIn = async () => {
    Alert.alert("V2 clicked");
    try {
      const res = await magic.oauth.loginWithPopup({
        provider: "google",
        redirectURI: "magicbarernexample://",
      });
      Alert.alert(JSON.stringify(res));
    } catch (e: any) {
      Alert.alert(e.toString());
    }
  };

  /**
   *Apple sign in
   * */
  const magicAppleSignIn = async () => {
    const res = await magic.oauth.loginWithPopup({
      provider: "apple",
      redirectURI: "magicbarernexample://",
    });
    Alert.alert(JSON.stringify(res));
  };

  /**
   * email otp sign in
   * */
  const loginEmailOTP = async () => {
    Alert.alert("clicked");
    try {
      await magic.auth.loginWithEmailOTP({ email: email });
      const res = await magic.user.getInfo();
      Alert.alert(JSON.stringify(res));
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * sms sign in
   **/
  const smsLogin = async () => {
    try {
      const DID = await magic.auth.loginWithSMS({
        phoneNumber: phoneNumber,
      });
      Alert.alert(`Your DID is: ${DID}`);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Show Settings
   */
  const showSettings = async () => {
    try {
      await magic.user.showSettings({ page: DeepLinkPage.Recovery });
    } catch (err) {
      console.log(err);
    }
  };

  /** Magic Connect w/ UI  */
  const ConnectWithUI = async () => {
    try {
      const account = await magic.wallet.connectWithUI();
      Alert.alert(`Your Public address is: ${account[0]}`);
    } catch (err) {
      const e = err as Error;
      Alert.alert(e.message);
    }
  };

  /**
   * getInfo()
   * */
  const getInfo = async () => {
    const res = await magic.user.getInfo();
    Alert.alert(JSON.stringify(res));
  };

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

  /**
   * IsLoggedIn
   * */
  const isLoggedIn = async () => {
    const res = await magic.user.isLoggedIn();
    Alert.alert(JSON.stringify(res));
  };

  const logout = async () => {
    const isLoggedOut = await magic.user.logout();
    Alert.alert(String(isLoggedOut));
  };

  const TouchableButton = (props: { handler: () => void; title: String }) => (
    <View style={styles.actionContainer}>
      <Pressable style={styles.button} onPress={() => props.handler()}>
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Email Login */}
          <Card>
            <Card.Title title="Email OTP Login" />
            <View style={styles.loginContainer}>
              <View style={styles.emailContainer}>
                <Text>Email:</Text>
                <TextInput
                  style={styles.TextInputContainer}
                  onChangeText={(text) => onChangeEmail(text)}
                  value={email}
                />
              </View>
            </View>
            <TouchableButton handler={() => loginEmailOTP()} title="Login" />
          </Card>
          {/* Magic Sign-in with SMS */}
          <Card>
            <Card.Title title="Login with SMS" />
            <View style={styles.loginContainer}>
              <View style={styles.emailContainer}>
                <Text>Number:</Text>
                <TextInput
                  style={styles.TextInputContainer}
                  onChangeText={(number) => onChangePhoneNumber(number)}
                  value={phoneNumber}
                />
              </View>
            </View>
            <View style={styles.margin10}>
              <TouchableButton
                handler={() => smsLogin()}
                title="Login with SMS"
              />
            </View>
          </Card>
          {/* Google Sign in */}
          <Card>
            <Card.Title title="Google Login" />
            <TouchableButton
              handler={() => magicGoogleSignIn()}
              title="Login"
            />
          </Card>

          {/* Apple Sign in */}
          <Card>
            <Card.Title title="Apple Login" />
            <TouchableButton handler={() => magicAppleSignIn()} title="Login" />
          </Card>
          {/* Is Logged In */}
          <Card>
            <Card.Title title="Is Logged In" />
            <TouchableButton handler={() => isLoggedIn()} title="isLoggedIn" />
          </Card>
          {/* Solana Address */}
          <Card>
            <Card.Title title="Solana Address" />
            <TouchableButton
              handler={() => getSolanaPublicAddress()}
              title="get Solana address"
            />
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
            <View style={styles.margin10}>
              <TouchableButton
                handler={() => switchNetwork(Number(chainId))}
                title="switchEVMChain"
              />
            </View>
          </Card>
          {/* metaData */}
          <Card>
            <Card.Title title="Metadata (getInfo)" />
            <TouchableButton handler={() => getInfo()} title="metadata" />
          </Card>
          {/* Logout */}
          <Card>
            <Card.Title title="Logout" />
            <TouchableButton handler={() => logout()} title="Logout" />
          </Card>
          <Card>
            <Card.Title title="Recover Account" />
            <View style={styles.emailContainer}>
              <Text>Email:</Text>
              <TextInput
                style={styles.TextInputContainer}
                onChangeText={(text) => onChangerecoveryEmail(text)}
                value={recoveryEmail}
              />
            </View>
            <View style={styles.margin10}>
              <TouchableButton
                handler={() => showSettings()}
                title="Show Settings"
              />
            </View>
          </Card>
          <Card>
            <Card.Title title="Connect With UI" />
            <TouchableButton
              handler={() => ConnectWithUI()}
              title="Connect With UI"
            />
          </Card>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
}
