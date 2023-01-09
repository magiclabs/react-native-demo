module.exports = {
    resolver: {

        /* Step 1: Add extra Node Modules to support `crypto` package for web3.js */
        extraNodeModules: require('node-libs-browser')
    }
};
