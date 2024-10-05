import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import { ColorSchemeName, LogBox } from "react-native";
import AxiosErrorHandler from "@/contexts/AxiosErrorHandler";

import Toast from "react-native-toast-message";
import AuthenticationScreen from "@/components/auth/AuthenticationScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AxiosErrorHandler>
        <AppContent colorScheme={colorScheme} />
        <Toast />
      </AxiosErrorHandler>
    </AuthProvider>
  );
}

function AppContent({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <AuthenticationScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
