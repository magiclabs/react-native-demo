import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '800',
    display: 'flex',
    alignSelf: 'center',
    paddingTop: 25
  },
  TextInputContainer: {
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    height: 30,
    paddingHorizontal: 10
  },
  contentContainer: {
    paddingTop: 30,
  },
  loginContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  emailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    alignSelf: 'center'
  },
  publicAddress: {
    alignSelf: 'flex-start',
    marginTop: 10
  },
  button: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  margin10: {
    margin: 10
  }
});
