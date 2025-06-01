import { theme } from "@/constants/theme";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

const PrimaryButton = ({ title, onPress, style, textStyle, disabled }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: theme.radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colors.textWhite,
    fontSize: theme.fonts.size.subHeader,
    fontWeight: theme.fonts.weight.semibold,
  },
  disabled: {
    backgroundColor: theme.colors.gray,
  },
});
