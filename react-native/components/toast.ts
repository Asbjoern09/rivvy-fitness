import Toast from "react-native-toast-message";

const showToast = (
  type: "success" | "error" | "info",
  text1: string,
  text2: string
) => {
  Toast.show({
    type,
    text1,
    text2,
    position: "top",
    topOffset: 60,
  });
};

export const showSuccessToast = (text1: string, text2: string) => {
  showToast("success", text1, text2);
};

export const showErrorToast = (text1: string, text2: string) => {
  showToast("error", text1, text2);
};

export const showInfoToast = (text1: string, text2: string) => {
  showToast("info", text1, text2);
};
