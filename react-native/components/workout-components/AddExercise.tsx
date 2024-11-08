// src/Workout.tsx
import React, { useState } from "react";
import { ScrollView, View, TextInput, Button, Text, StyleSheet, useColorScheme } from "react-native";
import { addWorkout } from "@/api/workoutApi";

const AddExercise: React.FC = () => {
  const colorScheme = useColorScheme(); // Detect color scheme
  const [exerciseName, setExerciseName] = useState(""); // For the exercise name

  const styles = getStyles(colorScheme as "light" | "dark" | null); // Assert type

  const handleSaveExercise = () => {
    addWorkout(exerciseName)
    setExerciseName("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Exercise Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter exercise name"
          value={exerciseName}
          onChangeText={setExerciseName}
        />

        <Button title="Save Exercise" onPress={handleSaveExercise} />
      </View>
    </ScrollView>
  );
};

// Function to get styles based on color scheme
const getStyles = (colorScheme: "light" | "dark" | null) => {
  const isDarkMode = colorScheme === "dark";

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    form: {
      width: "100%",
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginVertical: 8,
      color: isDarkMode ? "#fff" : "#000",
    },
    input: {
      height: 40,
      borderColor: isDarkMode ? "#fff" : "#000",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      paddingLeft: 10,
      color: isDarkMode ? "#fff" : "#000",
      backgroundColor: isDarkMode ? "#333" : "#fff",
    },
  });
};

export default AddExercise;
