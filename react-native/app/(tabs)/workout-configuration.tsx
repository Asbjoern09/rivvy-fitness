import React, { useState } from "react";
import { ScrollView, View, TextInput, Button, Text, StyleSheet, useColorScheme, SafeAreaView } from "react-native";
import AddExercise from "@/components/workout-components/AddExercise";

const MakeWorkout: React.FC = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme as "light" | "dark" | null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        style={styles.scrollView}
      >
        <View style={styles.viewContainer}>
          <AddExercise />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colorScheme: "light" | "dark" | null) => {
  const isDarkMode = colorScheme === "dark";
  
  return StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      width: '100%',
    },
    container: {
      flexGrow: 1,
      width: '100%',
    },
    viewContainer: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 16, // Add some horizontal padding if needed
    },
  });
};

export default MakeWorkout;