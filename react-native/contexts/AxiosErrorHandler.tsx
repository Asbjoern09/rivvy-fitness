import { useEffect } from "react";

import { useAuth } from "./AuthContext";
import instance from "@/api/axiosInstance";
import { showErrorToast } from "@/components/toast";

const AxiosErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          isAuthenticated
        ) {
          logout();
          showErrorToast("Session expired", "Please log in again.");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  return <>{children}</>;
};

export default AxiosErrorHandler;
