// src/Workout.tsx
import React from "react";
import { ScrollView, View, StyleSheet, useColorScheme } from "react-native";
import WorkoutItem from "../../components/workout-components/WorkoutItem";

const Workout: React.FC = () => {
  const colorScheme = useColorScheme(); // Detect color scheme

  const styles = getStyles(colorScheme); // Get styles based on color scheme

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.list}>
        <WorkoutItem />
        <WorkoutItem />
        <WorkoutItem />
        <WorkoutItem />
      </View>
    </ScrollView>
  );
};

// Function to get styles based on color scheme
const getStyles = (colorScheme: "light" | "dark" | null) => {
  const isDarkMode = colorScheme === "dark";

  return StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
      paddingVertical: 16,
      backgroundColor: isDarkMode ? "#121212" : "#f5f5f5", // Dark mode background
    },
    list: {
      width: "90%",
      maxWidth: 600,
      backgroundColor: isDarkMode ? "#1e1e1e" : "#fff", // Light and dark mode backgrounds
      borderRadius: 8,
      padding: 16,
      shadowColor: "#000",
      marginTop: 0,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  });
};

export default Workout;
