import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { IconProps } from "phosphor-react-native";
import { theme } from "@/constants/theme";

type Option = {
  label: string;
  value: string;
};

type Props = {
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  LeftIcon?: React.FC<IconProps>;
};

const PrimaryDropdown = ({
  selectedValue,
  onValueChange,
  options,
  placeholder = "Select an option",
  LeftIcon,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel =
    options.find((option) => option.value === selectedValue)?.label ||
    placeholder;

  return (
    <View style={styles.container}>
      {LeftIcon && <LeftIcon size={32} color={theme.colors.gray} />}
      <TouchableOpacity
        style={[styles.dropdown, LeftIcon && styles.dropdownWithIcon]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.text}>{selectedLabel}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PrimaryDropdown;

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
  dropdown: {
    flex: 1,
    paddingVertical: 8,
  },
  dropdownWithIcon: {
    marginLeft: 12,
  },
  text: {
    fontSize: theme.fonts.size.subHeader,
    color: theme.colors.text,
  },
  overlay: {
    flex: 1,
    backgroundColor: "#00000055",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: theme.radius.sm,
    maxHeight: "50%",
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
  },
  optionText: {
    fontSize: 16,
  },
});
