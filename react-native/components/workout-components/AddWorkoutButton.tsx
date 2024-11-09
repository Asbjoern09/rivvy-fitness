// components/workout-components/AddWorkoutButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';

interface AddWorkoutButtonProps {
  onPress: () => void;
}

const AddWorkoutButton: React.FC<AddWorkoutButtonProps> = ({ onPress }) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme as "light" | "dark" | null);

  return (
    <TouchableOpacity 
      style={styles.addWorkoutButton}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>Add Another Exercise Group</Text>
    </TouchableOpacity>
  );
};

const getStyles = (colorScheme: "light" | "dark" | null) => {
  const isDarkMode = colorScheme === "dark";
  
  return StyleSheet.create({
    addWorkoutButton: {
      backgroundColor: isDarkMode ? "#555" : "#ccc",
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: isDarkMode ? "#fff" : "#000",
      fontSize: 16,
      fontWeight: "500",
    }
  });
};

export default AddWorkoutButton;