// src/components/workout-components/NumberCircle.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

interface NumberCircleProps {
  number: number;
  onPress: () => void;
  isEditMode: boolean;
  onRemove: () => void;
}

const NumberCircle: React.FC<NumberCircleProps> = ({
  number,
  onPress,
  isEditMode,
  onRemove,
}) => {
  const colorScheme = useColorScheme(); // Detect color scheme

  const styles = getStyles(colorScheme as "light" | "dark" | null); // Assert type

  return (
    <View>
      <TouchableOpacity
        style={[styles.circle, isEditMode && styles.circleEditMode]}
        onPress={isEditMode ? onRemove : onPress}
      >
        <Text style={styles.numberText}>{number}</Text>
        {isEditMode && (
          <View style={styles.editIndicator}>
            <Text style={styles.editIndicatorText}>-</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Function to get styles based on color scheme
const getStyles = (colorScheme: "light" | "dark" | null) => {
  const isDarkMode = colorScheme === "dark";

  return StyleSheet.create({
    circle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: isDarkMode ? "#ccc" : "#666",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#444" : "#fff", // Circle background color
    },
    circleEditMode: {
      borderColor: "#ff4444",
    },
    numberText: {
      fontSize: 16,
      color: isDarkMode ? "#fff" : "#666", // Number color
    },
    editIndicator: {
      position: "absolute",
      top: -6,
      right: -6,
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: "#ff4444",
      alignItems: "center",
      justifyContent: "center",
    },
    editIndicatorText: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    },
  });
};

export default NumberCircle;
