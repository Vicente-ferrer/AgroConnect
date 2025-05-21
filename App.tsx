import React from 'react';
import RootNavigation from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigation />
    </GestureHandlerRootView>
  );
}
