import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import Navigation from './navigation';
import { useMagic } from './hooks/magic';

export default function App() {

  const { magic } = useMagic();

    return (
        <SafeAreaProvider>
            <Navigation />
          <magic.Relayer />
        </SafeAreaProvider>
    );
}
