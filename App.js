import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthProvider } from './auth/AuthContext';
import AppNavigator from './components/Tab/AppNavigator';

export const SpaceScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }}></View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SpaceScreen/>
      <StatusBar />
      <AuthProvider>
        <AppNavigator/>
      </AuthProvider>
    </SafeAreaProvider>
  );
}