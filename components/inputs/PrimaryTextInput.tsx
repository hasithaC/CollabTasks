import { theme } from "@/constants/theme";
import React from "react";
import { TextInput, StyleSheet, View, TextInputProps } from "react-native";
import { IconProps } from "phosphor-react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
  secureTextEntry?: boolean;
  multiline?: boolean;
  LeftIcon?: React.FC<IconProps>;
};

const PrimaryTextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  multiline = false,
  LeftIcon,
}: Props) => {
  return (
    <View style={styles.container}>
      {LeftIcon && (
          <LeftIcon size={28} color={theme.colors.gray} />
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.multiline,
          LeftIcon && styles.inputWithIcon,
        ]}
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={theme.colors.textLight}
      />
    </View>
  );
};

export default PrimaryTextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    borderColor: theme.colors.gray,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 12,
    fontSize: theme.fonts.size.subHeader,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});
