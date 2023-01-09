import React from 'react';
import {TextInput, Text, View, Pressable, ScrollView} from 'react-native';
import { styles } from './styles';
import { Card } from 'react-native-elements';

export default function LoginScreen (props: { magic: any; }) {

  const [email, onChangeEmail] = React.useState('jerry@magic.link');
  const { magic } = props;

  /**
   * regular sign in
   * */
  const login = async () => {
    try {
      await magic.auth.loginWithMagicLink({email: email});

      const res = await magic.user.getMetadata();
      alert(JSON.stringify(res));
    } catch(err) {
      console.log(err);
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

  const TouchableButton = (props: {handler: () => void, title: String}) => (
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
            <TouchableButton  handler={() => login()} title="Login"/>
          </Card>

          {/* Is Logged In */}
          <Card>
            <Card.Title>Is Logged In</Card.Title>
            <TouchableButton  handler={() => isLoggedIn()} title="isLoggedIn"/>
          </Card>

          {/* metaData */}
          <Card>
            <Card.Title>Metadata</Card.Title>
            <TouchableButton  handler={() => getMetadata()} title="metadata"/>
          </Card>

          {/* Logout */}
          <Card>
            <Card.Title>Logout</Card.Title>
            <TouchableButton  handler={() => logout()} title="Logout"/>
          </Card>
        </ScrollView>
      </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};