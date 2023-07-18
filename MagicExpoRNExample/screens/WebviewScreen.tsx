import React, {useCallback} from 'react';
import { Button, TextInput, Text, View } from 'react-native';
import { styles } from './styles';
import "../shim"; // Required for Bitcoin Blockchain interaction
import WebView from "react-native-webview";

export default function WebviewScreen(props: { web3: any; magic: any }) {

    React.useEffect(() => {
    }, []);

    return (
        <View style={styles.container}>
                <View style={styles.container}>
                    <WebView
                        webviewDebuggingEnabled={true}
                        source={{ uri: 'https://google.com' }} // Replace with the desired URL
                        style={{ flex: 1 }}
                    />
                </View>

        </View>
    );
}



WebviewScreen.navigationOptions = {
    header: null,
};


