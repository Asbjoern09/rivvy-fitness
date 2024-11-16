import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import NumberCircle from "./NumberCircle";
import WorkoutDropdown from "./WorkoutDropdown";
import { ExerciseData } from "@/api/types";

interface WorkoutItemProps {
  exercises: ExerciseData[];
  onRemove?: () => void;
  isRemovable?: boolean;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({
  exercises,
  onRemove,
  isRemovable = true,
}) => {
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0, 0]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const colorScheme = useColorScheme();

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

  const dropdownOptions = exercises.map((exercise) => ({
    label: exercise.exercise,
    value: exercise.exercise,
  }));

  const styles = getStyles(colorScheme as "light" | "dark" | null);

  return (
    <View style={styles.listItem}>
      <View style={styles.header}>
        <WorkoutDropdown
          options={dropdownOptions}
          value={selectedWorkout}
          onChange={(option) => setSelectedWorkout(option.value)}
          placeholder="Select workout type"
          containerStyle={styles.dropdownContainer}
        />

        <View style={styles.buttonContainer}>
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
          {isRemovable && onRemove && (
            <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
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
    dropdownContainer: {
      flex: 1,
      marginRight: 8,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 8,
    },
    editButton: {
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
    removeButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      backgroundColor: isDarkMode ? "#662222" : "#ffcccc",
      alignItems: "center",
      justifyContent: "center",
    },
    removeButtonText: {
      color: isDarkMode ? "#fff" : "#cc0000",
      fontSize: 14,
      fontWeight: "bold",
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
