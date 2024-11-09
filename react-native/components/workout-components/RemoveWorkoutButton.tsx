// components/workout-components/RemoveWorkoutButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';

interface RemoveWorkoutButtonProps {
  onPress: () => void;
}

const RemoveWorkoutButton: React.FC<RemoveWorkoutButtonProps> = ({ onPress }) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme as "light" | "dark" | null);

  return (
    <TouchableOpacity 
      style={styles.removeWorkoutButton}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>Remove Exercise Group</Text>
    </TouchableOpacity>
  );
};

const getStyles = (colorScheme: "light" | "dark" | null) => {
  const isDarkMode = colorScheme === "dark";
  
  return StyleSheet.create({
    removeWorkoutButton: {
      backgroundColor: isDarkMode ? "#662222" : "#ffcccc",
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 8,
    },
    buttonText: {
      color: isDarkMode ? "#fff" : "#cc0000",
      fontSize: 16,
      fontWeight: "500",
    }
  });
};

export default RemoveWorkoutButton;