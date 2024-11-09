import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "@/api/axiosInstance";
import { Credentials, UserInfo } from "./types";

const authorizationHeader = "Authorization";

export const authenticate = async ({ name, password }: Credentials) => {
  try {
    const response = await instance.post("/auth/login", { name, password });
    const { token, tokenType } = response.data;
    await AsyncStorage.setItem("token", token);
    instance.defaults.headers.common[
      authorizationHeader
    ] = `${tokenType} ${token}`;
    return { token, tokenType };
  } catch (error) {
    console.error("Failed to authenticate:", error);
    throw error;
  }
};

export const register = async ({ name, email, password }: Credentials) => {
  const apiUrl = `${instance.defaults.baseURL}/auth/register`; // assuming you set baseURL in axios instance

  try {
    await instance.post(apiUrl, {
      name,
      email,
      password,
    });
  } catch (error) {
    console.error(`Failed to register. API URL: ${apiUrl}`, error);
    throw error;
  }
};


export const removeAuthHeader = async () => {
  delete instance.defaults.headers.common[authorizationHeader];
};

export const getUserInfo = async (): Promise<UserInfo> => {
  try {

    const token = await AsyncStorage.getItem("token");

    // If token exists, set the Authorization header
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("Token is not available");
    }
    const response = await instance.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};
