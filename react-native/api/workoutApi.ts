import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "@/api/axiosInstance";
import { ExerciseData } from "./types";

export const addWorkout = async (exercise: string) => {
  const apiUrl = `${instance.defaults.baseURL}/workouts/addWorkout`; // assuming you set baseURL in axios instance

  try {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem("token");

    // If token exists, set the Authorization header
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("Token is not available");
    }

    // Now make the POST request
    await instance.post(apiUrl, { exercise });

  } catch (error) {
    console.error(`Failed to register. API URL: ${apiUrl}`, error);
    throw error;
  }
};

export const getExercises = async (): Promise<ExerciseData[]> => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("Token is not available");
    }

    const response = await instance.get("/workouts/getExercises");

    const exercises: ExerciseData[] = response.data.map((item: any) => ({
      _id: item._id,
      userId: item.userId,
      exercise: item.exercise,
    }));

    return exercises;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
