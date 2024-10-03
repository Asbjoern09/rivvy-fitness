import axiosInstance from "@/api/axiosInstance";
import { ApiResponse } from "./types";

export const fetchData = async (): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.get("/data");
        console.log(response)
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
