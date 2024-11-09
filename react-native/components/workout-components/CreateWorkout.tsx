import React, { useState, useEffect } from "react";
import { ScrollView, View, TextInput, TouchableOpacity, Text, StyleSheet, useColorScheme } from "react-native";
import { addWorkout, getExercises } from "@/api/workoutApi";
import { ExerciseData } from "@/api/types"; // Adjust the import based on your project structure
import RNPickerSelect from "react-native-picker-select";

const CreateWorkout: React.FC = () => {
  const colorScheme = useColorScheme();
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null); // State to manage the selected workout

  const styles = getStyles(colorScheme as "light" | "dark" | null);

  // Fetch exercises when the component mounts
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };

    fetchExercises();
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
    
        <RNPickerSelect
          onValueChange={(value) => setSelectedWorkout(value)}
          items={exercises.map((exercise) => ({
            label: exercise.exercise, // Exercise name as label
            value: exercise._id,      // Exercise ID as value
          }))}
          style={{
            inputAndroid: styles.picker,
            inputIOS: styles.picker,
          }}
          placeholder={{
            label: "Select workout type",
            value: null,
            color: "#666",
          }}
          value={selectedWorkout} // Set the current selected value
        />
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
    picker: {
      color: isDarkMode ? "#fff" : "#000",
      marginVertical: 20,
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: isDarkMode ? "#333" : "#f0f0f0",
      borderRadius: 5,
    },
    exercisesList: {
      marginTop: 20,
    },
    exerciseText: {
      color: isDarkMode ? "#fff" : "#000",
    },
  });
};

export default CreateWorkout;
