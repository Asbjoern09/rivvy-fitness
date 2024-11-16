import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from "react-native";
import AddExercise from "@/components/workout-components/AddExercise";
import CreateWorkout from "@/components/workout-components/CreateWorkout";
import WorkoutItem from "@/components/workout-components/WorkoutItem";
import { ThemedView } from "@/components/ThemedView";
import AddWorkoutButton from "@/components/workout-components/AddWorkoutButton";
import { getExercises } from "@/api/workoutApi";
import { ExerciseData } from "@/api/types";

interface WorkoutItemData {
  id: string;
}

const MakeWorkout: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme as "light" | "dark" | null);

  const [workoutItems, setWorkoutItems] = useState<WorkoutItemData[]>([
    { id: Date.now().toString() },
  ]);
  const [exercises, setExercises] = useState<ExerciseData[]>([]);

  // Fetch exercises function
  const fetchExercises = async () => {
    try {
      const data = await getExercises();
      setExercises(data);
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleRefresh = () => {
    fetchExercises();
  };

  const handleAddWorkout = () => {
    setWorkoutItems((prevItems) => [
      ...prevItems,
      { id: Date.now().toString() },
    ]);
  };

  const handleRemoveWorkout = (idToRemove: string) => {
    setWorkoutItems((prevItems) =>
      prevItems.filter((item) => item.id !== idToRemove)
    );
  };

  return (
    <ThemedView style={styles.themedView}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.scrollView}
        >
          <View style={styles.viewContainer}>
            {workoutItems.map((item) => (
              <WorkoutItem
                key={item.id}
                exercises={exercises}
                onRemove={() => handleRemoveWorkout(item.id)}
                isRemovable={workoutItems.length > 1}
              />
            ))}
            <AddWorkoutButton onPress={handleAddWorkout} />
            <AddExercise onTriggerFetch={handleRefresh} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

const getStyles = (colorScheme: "light" | "dark" | null) => {
  const isDarkMode = colorScheme === "dark";

  return StyleSheet.create({
    themedView: {
      flex: 1,
    },
    safeArea: {
      marginTop: 60,
      flex: 1,
    },
    scrollView: {
      flex: 1,
      width: "100%",
    },
    container: {
      flexGrow: 1,
      width: "100%",
    },
    viewContainer: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 16,
      gap: 16,
    },
  });
};

export default MakeWorkout;
