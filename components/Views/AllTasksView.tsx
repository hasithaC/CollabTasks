import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchTasks, getFilteredTasks } from "@/services/dbService";
import { theme } from "@/constants/theme";
import { Task, User } from "@/models";
import { useDispatch, useSelector } from "react-redux";
import { setAllTask } from "@/actions/action";
import { CaretCircleRight, CaretDoubleRight } from "phosphor-react-native";
import { useRouter } from "expo-router";

const AllTasksView = () => {
  const tasks: Task[] = useSelector(
    (state: any) => state.sessionReducer.allTasks
  );
  const user: User = useSelector((state: any) => state.sessionReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const { data, error } = await fetchTasks();
    if (error) {
      console.error("Error fetching tasks:", error.message);
      return;
    }
    if (data) {
      dispatch(setAllTask(data));
    }
  };

  const renderTaskItem = ({ item }: { item: Task }) => {
    const initial = item.assignee?.name
      ? item.assignee.name[0].toUpperCase()
      : "?";
    return (
      <View style={styles.taskCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.taskTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.taskDescription} numberOfLines={1}>
            {item.description}
          </Text>
        </View>
        <View>
          <View
            style={[
              styles.indicator,
              {
                backgroundColor:
                  theme.statusColors.priority[
                    item.priority as keyof typeof theme.statusColors.priority
                  ] || theme.colors.gray,
              },
            ]}
          >
            <Text style={styles.indicatorText}>
              {item.priority.toUpperCase()}
            </Text>
          </View>
          <View
            style={[
              styles.indicator,
              {
                backgroundColor:
                  theme.statusColors.taskStatus[
                    item.status as keyof typeof theme.statusColors.taskStatus
                  ] || theme.colors.gray,
              },
            ]}
          >
            <Text style={styles.indicatorText}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            router.navigate({
              pathname: "/TaskDetailsScreen",
              params: {
                task: JSON.stringify(item),
              },
            });
          }}
        >
          <CaretCircleRight size={32} color={theme.colors.dark} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderTaskItem}
    />
  );
};

export default AllTasksView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: theme.backgrounds.white,
  },
  header: {
    fontSize: theme.fonts.size.title,
    fontWeight: "600",
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  taskCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.md,
    marginBottom: 10,
    backgroundColor: theme.backgrounds.lightGray,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: theme.colors.textWhite,
    fontSize: theme.fonts.size.header,
    fontWeight: theme.fonts.weight.semibold,
  },
  taskTitle: {
    flex: 1,
    fontSize: theme.fonts.size.body,
    fontWeight: theme.fonts.weight.medium,
    marginBottom: 2,
  },
  taskDescription: {
    flex: 1,
    fontSize: theme.fonts.size.caption,
    fontWeight: theme.fonts.weight.medium,
    marginBottom: 2,
    marginRight: 4,
  },
  indicator: {
    marginVertical: 2,
    padding: 4,
    borderRadius: theme.radius.xxs,
    backgroundColor: theme.colors.roseLight,
  },
  indicatorText: {
    textAlign: 'center',
    color: theme.colors.textWhite,
    fontWeight: theme.fonts.weight.semibold,
    fontSize: 12,
  },
  touchable: {
    paddingLeft: 12,
  },
});
