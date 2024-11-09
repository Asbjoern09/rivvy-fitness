import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Text,useColorScheme
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useAuth } from "@/contexts/AuthContext";
import { getUserInfo } from "@/api/auth/api";
import { showInfoToast } from "@/components/toast";

export default function HomeScreen() {
  const [username, setUsername] = useState<string | null>(null);
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
    showInfoToast("Logged out", "You have been successfully logged out.");
  };
  const colorScheme = useColorScheme();

  const styles = getStyles(colorScheme as "light" | "dark" | null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUsername(userInfo.name);
    };

    fetchUserInfo();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.titleText}>
          Hello {username}
        </ThemedText>
        <ThemedText>
          Welcome to Rivvy-fitness!
        </ThemedText>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}
const getStyles = (colorScheme: "light" | "dark" | null) => {
  const isDarkMode = colorScheme === "dark";

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 50,
    },
    header: {
      height: "100%",
      width: "100%",
      resizeMode: "cover",
    },
    titleText: {
      fontSize: 28,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
      marginBottom: 16,
    },
    button: {
      backgroundColor: "#FF6F61",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 24,
      elevation: 3,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: "absolute",
    },
    buttonText: {
      color: "#FFF",
      fontSize: 18,
      fontWeight: "600",
    },
  });
};

