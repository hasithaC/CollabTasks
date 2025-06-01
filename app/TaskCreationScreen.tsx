import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "@/constants/theme";
import BackButton from "@/components/buttons/BackButton";
import { useRouter } from "expo-router";
import PrimaryTextInput from "@/components/inputs/PrimaryTextInput";
import { createTask, fetchUsers } from "@/services/dbService";
import { FetchedUser, User } from "@/models";
import PrimaryDropdown from "@/components/inputs/PrimaryDropdown";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { TextAa, TextAlignLeft, UserCircleCheck } from "phosphor-react-native";
import { useSelector } from "react-redux";

const TaskCreationScreen = () => {
  const router = useRouter();

  const [fetchedUsers, setFetchedUsers] = useState<FetchedUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const user: User = useSelector((state: any) => state.sessionReducer.user);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data: users, error } = await fetchUsers();

    if (error) {
      console.error("Failed to fetch users:", error.message);
      return;
    }

    if (users) {
      setFetchedUsers(users);
    } else {
      setFetchedUsers([]);
    }
  };

  const userOptions = fetchedUsers.map((user) => ({
    label: user.name ?? "",
    value: user.id,
  }));

  const handleCreateTask = async () => {
    if (!title || !description || !selectedUserId) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }

    const { data, error } = await createTask({
      title: title,
      description: description,
      assigneeId: selectedUserId,
      creatorId: user.id,
    });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert("Success", "Task created!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton
          onPress={() => {
            router.back();
          }}
        />
        <Text style={styles.headerText}>Task Creation</Text>
      </View>

      <View style={styles.middleContainer}>
        <PrimaryTextInput
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
          LeftIcon={TextAa}
        />

        <PrimaryTextInput
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          multiline
          LeftIcon={TextAlignLeft}
        />

        <PrimaryDropdown
          selectedValue={selectedUserId}
          onValueChange={setSelectedUserId}
          options={userOptions}
          placeholder="Select an assignee"
          LeftIcon={UserCircleCheck}
        />
      </View>

      <PrimaryButton title="Create Task" onPress={handleCreateTask} />
    </View>
  );
};

export default TaskCreationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: theme.backgrounds.white,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontSize: theme.fonts.size.title,
    color: theme.colors.text,
    marginHorizontal: 10,
    fontWeight: theme.fonts.weight.semibold,
  },
  middleContainer: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "center",
  },
});
