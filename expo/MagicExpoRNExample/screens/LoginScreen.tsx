import React from 'react';
import { TextInput, Text, View, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Card } from 'react-native-elements';

export default function LoginScreen(props: { magic: any; web3?: any; }) {

  const [email, onChangeEmail] = React.useState('test@demo.app');
  const { magic } = props;

  /**
   *Google sign in
   * */
  const magicGoogleSignIn = async () => {
    const res = await magic.oauth.loginWithPopup({ provider: 'google', redirectURI: 'exp://' });
    alert(JSON.stringify(res));
  }

  /**
   *Apple sign in
   * */
  const magicAppleSignIn = async () => {
    const res = await magic.oauth.loginWithPopup({ provider: 'apple', redirectURI: 'exp://' });
    alert(JSON.stringify(res));
  }

  /**
   * regular sign in
   * */
  const login = async () => {
    try {
      await magic.auth.loginWithMagicLink({ email: email });

      const res = await magic.user.getMetadata();
      alert(JSON.stringify(res));
    } catch (err) {
      console.log(err);
    }
  };

  /** GetAccount */
  const getAccount = async () => {
    try {
      const account = await props.web3.eth.getAccounts();
      alert(`Your Public address is: ${account[0]}`);
    } catch (err) {
      alert(err);
    }
  };


  /**
   * getMetadata()
   * */
  const getMetadata = async () => {
    const res = await magic.user.getMetadata();
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        {/* Magic Sign-in */}
        <Card>
          <Card.Title>Passwordless Login</Card.Title>
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
          <TouchableButton handler={() => login()} title="Login" />
        </Card>
        {/* Magic Connect Sign-in */}
        <Card>
          <Card.Title>Magic Connect (MC) Login</Card.Title>
          <TouchableButton handler={() => getAccount()} title="MC Login" />
          <Text style={styles.subtitle}>MC API Keys Only</Text>
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
          <Card.Title>Metadata</Card.Title>
          <TouchableButton handler={() => getMetadata()} title="metadata" />
        </Card>

        {/* Logout */}
        <Card>
          <Card.Title>Logout</Card.Title>
          <TouchableButton handler={() => logout()} title="Logout" />
        </Card>
      </ScrollView>
    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};
