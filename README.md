## ✨ Magic React Native Demo Apps

This repository stores a variety of sample mobile applications utilizing all of Magic's React Native SDKs and extensions. 

### Setup and Installation

Sign up or login to the [developer dashboard](https://dashboard.magic.link) to receive API keys that will allow your application to interact with Magic's authentication APIs.

```shell
# SSH
$ git clone git@github.com:magiclabs/react-native-demo.git
# HTTPS
$ git clone https://github.com/magiclabs/react-native-demo.git
```

Once you have a local copy of this repository you'll need to navigate to the `config/env.ts` file to add your publishable magic API key.

```shell
# Add your Publishable Magic API key here
$ open MagicBareRnExample/config/env.ts
```

Finally, if you'd like to test sending transactions and other general on-chain interactions with these demo apps you'll need to navigate to `screens/Web3Screen.tsx` and include an address to a test wallet of your choosing.

```shell
# Add your test wallet address here
$ open MagicExpoRnExample/screens/Web3Screen.tsx
```

### Expo Tutorial (Managed flow)
Navigate to the Expo demo you wish to install. 

```shell
$ cd MagicExpoRNExample | MagicLegacyExpoRnExample
$ yarn
$ yarn start
```

When the bundler process is done, hit **i** to start an iOS simulator or **a** to start an Android simulator (make sure you have downloaded Android Studio and followed all the instructions on [React Native dev site](https://reactnative.dev/docs/environment-setup)).

### Bare React Native Tutorial (Standalone flow)
Navigate to related Bare React Native project you wish to install. 

```shell
$ cd MagicBareRNExample | MagicLegacyBareRnExample
$ yarn
```

After node modules are installed and linked, for iOS you will need to install the linked dependencies to native.

```shell
# iOS
$ cd ios
$ pod install
```
After a successful installation, you may run `yarn ios` or `yarn android` to get started. 

```shell
######### iOS ############
$ yarn ios --simulator="YOUR_PREFERRED_SIMULATOR_DEVICE" # run `xcrun simctl list devices` for a list of devices
######### Android ########
$ yarn android
```

