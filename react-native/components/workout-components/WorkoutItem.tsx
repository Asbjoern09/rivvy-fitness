// src/components/WorkoutItem.tsx
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import NumberCircle from "./NumberCircle";

const workoutTypes = [
  { label: "Cardio", value: "cardio" },
  { label: "Strength", value: "strength" },
  { label: "Yoga", value: "yoga" },
  { label: "Pilates", value: "pilates" },
];

const WorkoutItem: React.FC = () => {
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0, 0]); // Start with 5 counters
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedWorkout, setSelectedWorkout] = useState<string | undefined>(
    undefined
  );

  const colorScheme = useColorScheme(); // Detect color scheme

  const incrementCounter = (index: number) => {
    setCounters((currentCounters) => {
      const newCounters = [...currentCounters];
      newCounters[index] += 1;
      return newCounters;
    });
  };

  const addCounter = () => {
    setCounters((currentCounters) => [...currentCounters, 0]);
  };

  const removeCounter = (index: number) => {
    if (counters.length > 1) {
      setCounters((currentCounters) =>
        currentCounters.filter((_, i) => i !== index)
      );
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const styles = getStyles(colorScheme as "light" | "dark" | null); // Assert type

  return (
    <View style={styles.listItem}>
      <View style={styles.header}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedWorkout(value)}
          items={workoutTypes}
          style={{
            inputAndroid: styles.picker,
            inputIOS: styles.picker,
          }}
          placeholder={{
            label: "Select workout type",
            value: null,
            color: "#666",
          }}
        />
        <TouchableOpacity
          onPress={toggleEditMode}
          style={[styles.editButton, isEditMode && styles.editButtonActive]}
        >
          <Text
            style={[
              styles.editButtonText,
              isEditMode && styles.editButtonTextActive,
            ]}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.numbersContainer}>
        {counters.map((count, index) => (
          <NumberCircle
            key={index}
            number={count}
            onPress={() => incrementCounter(index)}
            isEditMode={isEditMode}
            onRemove={() => removeCounter(index)}
          />
        ))}
        {isEditMode && (
          <TouchableOpacity style={styles.addButton} onPress={addCounter}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Function to get styles based on color scheme
const getStyles = (colorScheme: "light" | "dark" | null) => {
  const isDarkMode = colorScheme === "dark";

  return StyleSheet.create({
    listItem: {
      marginBottom: 16,
      backgroundColor: isDarkMode ? "#333" : "#fff",
      borderRadius: 8,
      padding: 10,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    picker: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: isDarkMode ? "#ccc" : "#ddd",
      borderRadius: 4,
      paddingHorizontal: 12,
      color: isDarkMode ? "#fff" : "#666",
      backgroundColor: isDarkMode ? "#444" : "#fff",
    },
    editButton: {
      marginLeft: "auto",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: isDarkMode ? "#ccc" : "#666",
    },
    editButtonActive: {
      backgroundColor: isDarkMode ? "#666" : "#666",
      borderColor: isDarkMode ? "#666" : "#666",
    },
    editButtonText: {
      color: isDarkMode ? "#ccc" : "#666",
      fontSize: 14,
      fontWeight: "500",
    },
    editButtonTextActive: {
      color: "#fff",
    },
    numbersContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: 4,
    },
    addButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "#4CAF50",
      alignItems: "center",
      justifyContent: "center",
    },
    addButtonText: {
      color: "white",
      fontSize: 24,
    },
  });
};

export default WorkoutItem;
