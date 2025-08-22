## ✨ Magic React Native Demo Apps

This repository contains two mobile applications demonstrating Magic's React Native SDKs and extensions for both Bare React Native and Expo managed workflows.


### 🔑 Setup and Installation

1. **Get Magic API Keys**: Sign up or login to the [developer dashboard](https://dashboard.magic.link) to receive API keys.

2. **Clone the Repository**:
```shell
# SSH
$ git clone git@github.com:magiclabs/react-native-demo.git
# HTTPS
$ git clone https://github.com/magiclabs/react-native-demo.git
```

3. **Configure API Keys**: Update the Magic publishable API key in both projects:

- Bare React Native Example: `MagicBareRnExample/hooks/magic.ts`
- Expo Example: `MagicExpoRNExample/hooks/magic.ts`

Replace `'YOUR_PUBLISHABLE_KEY'` with your actual Magic publishable API key.

### 📱 Expo Tutorial (Managed Workflow)

The Expo example uses Expo Router for navigation and includes modern React Native features.

```shell
$ cd MagicExpoRNExample
$ yarn install
$ yarn start
```

When the bundler starts:
- Press **i** to open iOS simulator
- Press **a** to open Android emulator
- Press **w** to open in web browser

### 🔧 Bare React Native Tutorial (Standalone Workflow)

The Bare React Native example provides full native control and custom configurations.

```shell
$ cd MagicBareRNExample
$ yarn install
```

#### iOS Setup
```shell
$ cd ios
$ pod install
$ cd ..
$ yarn ios
```

#### Android Setup
```shell
$ yarn android
```

### 🚨 Troubleshooting

#### Error code 65 (iOS Build Issues)
If you encounter `Error code 65` when running `yarn ios`:

1. **Clean Build**: Follow [these steps](https://github.com/react-native-maps/react-native-maps/issues/2853#issuecomment-516760615) to clean your iOS build.

2. **Update AppDelegate**: If updating React Native versions, manually update the `AppDelegate.mm` file in Xcode as [suggested here](https://github.com/facebook/react-native/issues/36293#issuecomment-1445377662).

#### Pod Install Issues
If you encounter issues with `pod install`:
```shell
$ cd ios
$ pod install
```

#### Metro Cache Issues
Clear Metro cache if you encounter bundling issues:
```shell
$ yarn start --reset-cache
```

### 📚 Additional Resources

- [Magic Documentation](https://magic.link/docs)
- [Magic Developer Dashboard](https://dashboard.magic.link)

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev)



### 📄 License

This project is licensed under the MIT License. 

	