import React, { useState } from "react";
import { ScrollView, View, StyleSheet, useColorScheme, SafeAreaView } from "react-native";
import AddExercise from "@/components/workout-components/AddExercise";
import CreateWorkout from "@/components/workout-components/CreateWorkout";
import WorkoutItem from "@/components/workout-components/WorkoutItem";
import AddWorkoutButton from "@/components/workout-components/AddWorkoutButton";

interface WorkoutItemData {
  id: string;
}

const MakeWorkout: React.FC = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme as "light" | "dark" | null);
 
  const [workoutItems, setWorkoutItems] = useState<WorkoutItemData[]>([
    { id: Date.now().toString() }
  ]);

  const handleAddWorkout = () => {
    setWorkoutItems(prevItems => [
      ...prevItems,
      { id: Date.now().toString() }
    ]);
  };

  const handleRemoveWorkout = (idToRemove: string) => {
    setWorkoutItems(prevItems => 
      prevItems.filter(item => item.id !== idToRemove)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollView}
      >
        <View style={styles.viewContainer}>
          {workoutItems.map((item) => (
            <WorkoutItem 
              key={item.id}
              onRemove={() => handleRemoveWorkout(item.id)}
              isRemovable={workoutItems.length > 1}
            />
          ))}
          <AddWorkoutButton onPress={handleAddWorkout} />
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
      paddingHorizontal: 16,
      gap: 16,
    },
  });
};

export default MakeWorkout;