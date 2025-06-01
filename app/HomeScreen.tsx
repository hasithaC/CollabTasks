import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import BottomTabNavigator from "@/navigations/BottomTabNavigator";
import { theme } from "@/constants/theme";
import {
  Faders,
  PaperPlaneRight,
  PlusCircle,
  User,
  UserCircle,
  XCircle,
} from "phosphor-react-native";
import { signOutUser } from "@/services/authService";
import { useDispatch } from "react-redux";
import { setAllTask, setUser } from "@/actions/action";
import { useRouter } from "expo-router";
import HorizontalRadioGroup from "@/components/buttons/HorizontalRadioGroup";
import { TaskPriority, TaskStatus } from "@/models";
import { getFilteredTasks } from "@/services/dbService";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [filterBoxVisibility, setFilterBoxVisibility] = useState(false);
  const [taskPriority, setTaskPriority] = useState<TaskPriority | undefined>();
  const [taskStatus, setTaskStatus] = useState<TaskStatus | undefined>();
  const handleSignOut = async () => {
    const { error } = await signOutUser();
    if (error) {
      console.error("Sign-out error:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    } else {
      dispatch(setUser(null));
      Alert.alert("Success", "Signed out successfully.");
    }
  };

  const fetchFiltered = async (priority: TaskPriority, status: TaskStatus) => {
    try {
      const tasks = await getFilteredTasks({
        priority,
        status,
      });

      dispatch(setAllTask(tasks));
    } catch (err) {
      console.error("Error loading filtered tasks:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Collab Task</Text>

        <TouchableOpacity
          style={styles.headerTouchable}
          onPress={() => {
            setTaskPriority(undefined);
            setTaskStatus(undefined);
            setFilterBoxVisibility((prev) => !prev);
            fetchFiltered(undefined, undefined);
          }}
        >
          <Faders size={32} color={theme.colors.dark} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerTouchable}
          onPress={() => {
            router.navigate("/TaskCreationScreen");
          }}
        >
          <PlusCircle size={32} color={theme.colors.dark} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerTouchable}
          onPress={handleSignOut}
        >
          <UserCircle size={32} color={theme.colors.dark} />
        </TouchableOpacity>
      </View>

      {filterBoxVisibility && (
        <View style={styles.filterationBox}>
          <Text style={styles.filterationBoxTitle}>Task Filteration</Text>
          <View style={styles.filterationRow}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <HorizontalRadioGroup
                label="Task Status"
                options={["pending", "completed"]}
                selected={taskStatus}
                onChange={(value) => {
                  fetchFiltered(taskPriority, value as TaskStatus);
                  setTaskStatus(value as TaskStatus);
                }}
              />
            </View>

            <TouchableOpacity
              style={{ marginBottom: 4 }}
              onPress={() => {
                fetchFiltered(taskPriority, undefined);
                setTaskStatus(undefined);
              }}
            >
              <XCircle size={28} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.filterationRow}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <HorizontalRadioGroup
                label="Task Priority"
                options={["low", "medium", "high"]}
                selected={taskPriority}
                onChange={(value) => {
                  fetchFiltered(value as TaskPriority, taskStatus);
                  setTaskPriority(value as TaskPriority);
                }}
              />
            </View>

            <TouchableOpacity
              style={{ marginBottom: 4 }}
              onPress={() => {
                fetchFiltered(undefined, taskStatus);
                setTaskPriority(undefined);
              }}
            >
              <XCircle size={28} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <BottomTabNavigator />
    </View>
  );
};

export default HomeScreen;

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
    fontWeight: theme.fonts.weight.semibold,
  },
  headerTouchable: {
    paddingHorizontal: 4,
  },
  filterationBox: {
    width: "100%",
    padding: 10,
    backgroundColor: theme.backgrounds.lightGray,
    borderRadius: theme.radius.sm,
    //borderWidth: 1,
    borderColor: theme.colors.dark,
    marginVertical: 20,
  },
  filterationBoxTitle: {
    fontSize: theme.fonts.size.caption,
    color: theme.colors.dark,
    marginTop: 12,
  },
  filterationRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
  },
});
