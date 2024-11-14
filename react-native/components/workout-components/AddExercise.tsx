import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { addWorkout, getExercises } from "@/api/workoutApi";

interface AddExerciseProps {
  onTriggerFetch: () => void;
}
const AddExercise: React.FC<AddExerciseProps> = ({ onTriggerFetch }) => {
  const colorScheme = useColorScheme();
  const [exerciseName, setExerciseName] = useState("");

  const styles = getStyles(colorScheme as "light" | "dark" | null);

  const handleSaveExercise = () => {
    addWorkout(exerciseName); // Add new workout
    setExerciseName(""); // Clear input after saving
    onTriggerFetch();
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
        <TouchableOpacity
          style={styles.saveExerciseButton}
          onPress={handleSaveExercise}
        >
          <Text style={styles.buttonText}>Save Exercise</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
    saveExerciseButton: {
      backgroundColor: isDarkMode ? "#555" : "#ccc",
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: isDarkMode ? "#fff" : "#000",
      fontWeight: "bold",
    },
    exercisesList: {
      marginTop: 20,
    },
    exerciseText: {
      color: isDarkMode ? "#fff" : "#000",
    },
  });
};

export default AddExercise;
