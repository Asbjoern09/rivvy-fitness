import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from "react-native";

interface DropdownOption {
  label: string;
  value: string;
}

interface WorkoutDropdownProps {
  options: DropdownOption[];
  value: string | null;
  onChange: (option: DropdownOption) => void;
  placeholder?: string;
  containerStyle?: object;
}

const WorkoutDropdown: React.FC<WorkoutDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  containerStyle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option: DropdownOption) => {
    onChange(option);
    setIsVisible(false);
  };

  const styles = getStyles(isDarkMode);

  return (
    <>
      <TouchableOpacity
        style={[styles.dropdownButton, containerStyle]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Option</Text>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    item.value === value && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      item.value === value && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    dropdownButton: {
      height: 40,
      borderWidth: 1,
      borderColor: isDarkMode ? "#ccc" : "#ddd",
      borderRadius: 4,
      paddingHorizontal: 12,
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#444" : "#fff",
    },
    dropdownButtonText: {
      color: isDarkMode ? "#fff" : "#666",
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: isDarkMode ? "#333" : "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "80%",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#444" : "#eee",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDarkMode ? "#fff" : "#000",
    },
    modalCloseButton: {
      padding: 8,
    },
    modalCloseText: {
      fontSize: 20,
      color: isDarkMode ? "#fff" : "#666",
    },
    dropdownItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#444" : "#eee",
    },
    dropdownItemSelected: {
      backgroundColor: isDarkMode ? "#444" : "#f0f0f0",
    },
    dropdownItemText: {
      fontSize: 16,
      color: isDarkMode ? "#fff" : "#000",
    },
    dropdownItemTextSelected: {
      fontWeight: "600",
      color: isDarkMode ? "#fff" : "#000",
    },
  });

export default WorkoutDropdown;
