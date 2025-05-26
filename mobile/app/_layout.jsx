import '../i18n';
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import Toast from "react-native-toast-message";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";                     
import { View } from "react-native"; // ✅ ADICIONA ESTA LINHA


export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [user, token, segments]);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <SafeAreaProvider>
          <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(auth)" />
            </Stack>
            <StatusBar style="dark" />
            <Toast />
          </View>
        </SafeAreaProvider>
      </ThemeProvider>
    </I18nextProvider>

  );
}
