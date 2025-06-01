import { theme } from "@/constants/theme";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  label: string;
  options: string[];
  selected: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};
const selectedColors = ["#4CAF50", "#FF9800", "#F44336"];

const HorizontalRadioGroup = ({
  label,
  options,
  selected,
  onChange = () => {},
  disabled = false,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.radioContainer}>
        {options.map((option, index) => {
          const isSelected = selected === option;
          const selectedColor = selectedColors[index] || theme.backgrounds.lightGray;

          return (
            <TouchableOpacity
              disabled={disabled}
              key={option}
              style={[
                styles.radioButton,
                isSelected && {
                  backgroundColor: selectedColor,
                  borderColor: selectedColor,
                },
              ]}
              onPress={() => onChange(option)}
            >
              <Text
                style={[
                  styles.radioText,
                  isSelected && styles.radioTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default HorizontalRadioGroup;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 12,
  },
  label: {
    fontSize: theme.fonts.size.caption,
    color: theme.colors.textLight,
    marginBottom: 4,
  },
  radioContainer: {
    flexDirection: "row",
    gap: 12,
  },
  radioButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.backgrounds.dark,
    backgroundColor: theme.backgrounds.lightGray,
  },
  radioText: {
    textAlign: "center",
    color: theme.colors.textDark,
    fontWeight: "500",
    fontSize: theme.fonts.size.caption,
  },
  radioTextSelected: {
    color: "#fff",
  },
});
