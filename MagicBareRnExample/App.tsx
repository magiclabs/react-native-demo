import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import Navigation from './navigation';
import { MagicService } from './hooks/magic';

export default function App() {
    const magic = MagicService.magic;

    return (
        <SafeAreaProvider>
            <Navigation />
            <magic.Relayer />
        </SafeAreaProvider>
    );
}
