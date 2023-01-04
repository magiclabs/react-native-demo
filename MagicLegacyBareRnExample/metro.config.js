/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {

    /* Step 1: Add extra Node Modules to support `crypto` package for web3.js */
    extraNodeModules: require('node-libs-browser')
  }
};
