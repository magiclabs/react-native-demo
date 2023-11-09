import React from 'react';
import { TextInput, Text, View, Pressable } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Card } from 'react-native-elements';
import { DeepLinkPage } from '@magic-sdk/react-native-bare';

export default function LoginScreen(props: { magic: any; web3?: any; }) {

  const [email, onChangeEmail] = React.useState('hiro@magic.link');
  const [recoveryEmail, onChangerecoveryEmail] = React.useState('hiro@magic.link');
  const [phoneNumber, onChangePhoneNumber] = React.useState('+18888888888');
  const { magic } = props;

  /**
   *Google sign in
   * */
  const magicGoogleSignIn = async () => {
    const res = await magic.oauth.loginWithRedirect({ provider: 'google', redirectURI: 'magicbarernexample://' });
    alert(JSON.stringify(res));
  }

  /**
   *Apple sign in
   * */
  const magicAppleSignIn = async () => {
    const res = await magic.oauth.loginWithRedirect({ provider: 'apple', redirectURI: 'magicbarernexample://' });
    alert(JSON.stringify(res));
  }

  /**
   * email otp sign in
   * */
  const loginEmailOTP = async () => {
    try {
      await magic.auth.loginWithEmailOTP({ email: email });
      const res = await magic.user.getInfo();
      alert(JSON.stringify(res));
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
      })
      alert(`Your DID is: ${DID}`);
    } catch (err) {
      console.log(err);
    }
  };
  /**
   * Update SMS
   **/
  const updateSMS = async () => {
    try {
      await magic.auth.updatePhoneNumberWithUI();
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Recover Account
   */
  const recoverAccount = async () => {
    try {
      await magic.user.recoverAccount({ email: recoveryEmail });
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
  const showMCUserInterface = async () => {
    try {
      const account = await magic.wallet.connectWithUI();
      alert(`Your Public address is: ${account[0]}`);
    } catch (err) {
      alert(err);
    }
  };


  /**
   * getInfo()
   * */
  const getInfo = async () => {
    const res = await magic.user.getInfo();
    alert(JSON.stringify(res));
  }


  /**
   * IsLoggedIn
   * */
  const isLoggedIn = async () => {
    const res = await magic.user.isLoggedIn();
    alert(JSON.stringify(res));
  }

  const logout = async () => {
    const isLoggedOut = await magic.user.logout();
    alert(isLoggedOut);
  };

  const TouchableButton = (props: { handler: () => void, title: String }) => (
      <View style={styles.actionContainer}>
        <Pressable style={styles.button} onPress={() => props.handler()}>
          <Text style={styles.text}>{props.title}</Text>
        </Pressable>
      </View>
  )

  return (
      <View style={styles.container}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
            {/* Magic Auth Sign-in */}
            <Card>
              <Card.Title>Magic Auth</Card.Title>
              {/* Email Login */}
              <Card>
                <Card.Title>Email OTP Login</Card.Title>
                <View style={styles.loginContainer}>
                  <View style={styles.emailContainer}>
                    <Text>
                      Email:
                    </Text>
                    <TextInput
                        style={styles.TextInputContainer}
                        onChangeText={text => onChangeEmail(text)}
                        value={email}
                    />
                  </View>
                </View>
                <TouchableButton handler={() => loginEmailOTP()} title="Login" />
              </Card>
              {/* Magic Sign-in with SMS */}
              <Card>
                <Card.Title>Login with SMS</Card.Title>
                <View style={styles.loginContainer}>
                  <View style={styles.emailContainer}>
                    <Text>
                      Number:
                    </Text>
                    <TextInput
                        style={styles.TextInputContainer}
                        onChangeText={number => onChangePhoneNumber(number)}
                        value={phoneNumber}
                    />
                  </View>
                </View>
                <View style={styles.margin10}>
                  <TouchableButton handler={() => smsLogin()} title="Login with SMS" />
                </View>
                <View style={styles.margin10}>
                  <TouchableButton handler={() => updateSMS()} title="Update SMS" />
                </View>
              </Card>
              {/* Google Sign in */}
              <Card>
                <Card.Title>Google Login</Card.Title>
                <TouchableButton handler={() => magicGoogleSignIn()} title="Login" />
              </Card>

              {/* Apple Sign in */}
              <Card>
                <Card.Title>Apple Login</Card.Title>
                <TouchableButton handler={() => magicAppleSignIn()} title="Login" />
              </Card>
              {/* Is Logged In */}
              <Card>
                <Card.Title>Is Logged In</Card.Title>
                <TouchableButton handler={() => isLoggedIn()} title="isLoggedIn" />
              </Card>
              {/* metaData */}
              <Card>
                <Card.Title>Metadata (getInfo)</Card.Title>
                <TouchableButton handler={() => getInfo()} title="metadata" />
              </Card>
              {/* Logout */}
              <Card>
                <Card.Title>Logout</Card.Title>
                <TouchableButton handler={() => logout()} title="Logout" />
              </Card>
              <Card>
                <Card.Title>Recover Account</Card.Title>
                <View style={styles.emailContainer}>
                  <Text>
                    Email:
                  </Text>
                  <TextInput
                      style={styles.TextInputContainer}
                      onChangeText={text => onChangerecoveryEmail(text)}
                      value={recoveryEmail}
                  />
                </View>
                <View style={styles.margin10}>
                  <TouchableButton handler={() => recoverAccount()} title="Recover Account" />
                </View>
                <View style={styles.margin10}>
                  <TouchableButton handler={() => showSettings()} title="Show Settings" />
                </View>
              </Card>
            </Card>

            {/* Magic Connect Sign-in */}
            <Card>
              <Card.Title>Magic Connect</Card.Title>
              <TouchableButton handler={() => showMCUserInterface()} title="MC Login" />
            </Card>
          </ScrollView >
        </GestureHandlerRootView>
      </View >
  );
}

LoginScreen.navigationOptions = {
  header: null,
};
