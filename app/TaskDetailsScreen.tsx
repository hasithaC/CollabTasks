import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "@/constants/theme";
import BackButton from "@/components/buttons/BackButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Comment, Task, TaskPriority, TaskStatus, User } from "@/models";
import {
  ArrowRight,
  ChatCenteredText,
  PaperPlaneRight,
} from "phosphor-react-native";
import PrimaryTextInput from "@/components/inputs/PrimaryTextInput";
import HorizontalRadioGroup from "@/components/buttons/HorizontalRadioGroup";
import {
  addCommentToTask,
  getCommentsForTask,
  updateTaskPriority,
  updateTaskStatus,
} from "@/services/dbService";
import { useSelector } from "react-redux";

const TaskDetailsScreen = () => {
  const router = useRouter();
  const { task } = useLocalSearchParams();
  const initialParsedTask: Task = JSON.parse(task as string);
  const user: User = useSelector((state: any) => state.sessionReducer.user);

  const [comment, setComment] = useState("");
  const [parsedTask, setParsedTask] = useState(initialParsedTask);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [taskPriority, setTaskPriority] = useState<TaskPriority>(
    initialParsedTask.priority
  );

  const [taskStatus, setTaskStatus] = useState<TaskStatus>(
    initialParsedTask.status
  );

  const getInitialFromName = (name?: string): string => {
    return name && name.length > 0 ? name[0].toUpperCase() : "?";
  };

  const taskId = parsedTask.id;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsForTask(taskId);
        setCommentList(data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [taskId]);

  const handleAddComment = async () => {
    try {
      const newComment = await addCommentToTask({
        content: comment,
        taskId: parsedTask.id,
        creatorId: user.id,
      });
      setCommentList((prev) => [...prev, newComment as Comment]);
      setComment("");
      Alert.alert("Success", "Comment added!");
    } catch (error) {
      Alert.alert("Error", "Failtue");
    }
  };

  const renderItem = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentCreatorNameText}>{item.creator?.name}</Text>
      <Text style={styles.contentText}>{item.content}</Text>
      <Text style={styles.dateText}>
        {new Date(item.created_at).toLocaleString()}
      </Text>
    </View>
  );

  const handlePriorityChange = async (
    taskId: number,
    selectedPriority: TaskPriority
  ) => {
    try {
      const updatedTask = await updateTaskPriority(taskId, selectedPriority);
      setTaskPriority(selectedPriority);

      Alert.alert("Success", "Updated task");
    } catch (err) {
      Alert.alert("Error", "Failtue");
    }
  };

  const handleStatusChange = async (
    taskId: number,
    selectedStatus: TaskStatus
  ) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, selectedStatus);

      setTaskStatus(selectedStatus);
      Alert.alert("Success", "Updated task");
    } catch (err) {
      Alert.alert("Error", "Failtue");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton
          onPress={() => {
            router.back();
          }}
        />
        <Text style={styles.headerText}>Task Details</Text>
      </View>

      <FlatList
        data={commentList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No comments yet.</Text>
        }
        ListHeaderComponent={
          <View style={styles.middleContainer}>
            <View style={styles.avatarsContainer}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {getInitialFromName(parsedTask.creator?.name)}
                  </Text>
                </View>
                <Text style={styles.nameText} numberOfLines={2}>
                  {parsedTask.creator?.name}
                </Text>
              </View>

              <View style={styles.arrowContainer}>
                <ArrowRight size={32} color={theme.colors.gray} />
              </View>

              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {getInitialFromName(parsedTask.assignee?.name)}
                  </Text>
                </View>
                <Text style={styles.nameText} numberOfLines={2}>
                  {parsedTask.assignee?.name}
                </Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Title</Text>
              <Text style={styles.detailValue}>{parsedTask.title}</Text>

              <Text style={styles.detailLabel}>Description</Text>
              <Text style={styles.detailValue}>{parsedTask.description}</Text>

              <HorizontalRadioGroup
                label="Task Status"
                options={["pending", "completed"]}
                selected={taskStatus}
                onChange={(value) => {
                  handleStatusChange(parsedTask.id, value as TaskStatus);
                }}
              />

              <HorizontalRadioGroup
                label="Task Priority"
                options={["low", "medium", "high"]}
                selected={taskPriority}
                onChange={(value) => {
                  handlePriorityChange(parsedTask.id, value as TaskPriority);
                }}
              />

              <Text style={styles.detailLabel}>Created At</Text>
              <Text style={styles.detailValue}>
                {new Date(parsedTask.created_at).toLocaleString()}
              </Text>
            </View>
          </View>
        }
      />
      <View style={styles.commentBar}>
        <View style={styles.commentInputContainer}>
          <PrimaryTextInput
            placeholder="Add comment"
            value={comment}
            onChangeText={setComment}
            keyboardType="default"
            LeftIcon={ChatCenteredText}
          />
        </View>

        <TouchableOpacity
          onPress={handleAddComment}
          disabled={!comment}
          style={styles.sendIconTouchable}
        >
          <PaperPlaneRight size={28} color={theme.colors.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskDetailsScreen;

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
  avatarsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    margin: 20,
  },
  avatarText: {
    color: theme.colors.textWhite,
    fontSize: theme.fonts.size.header,
    fontWeight: theme.fonts.weight.semibold,
  },
  nameText: {
    textAlign: "center",
    fontSize: theme.fonts.size.body,
    color: theme.colors.textLight,
  },
  avatarContainer: {
    width: 120,
    height: 160,
  },
  arrowContainer: {
    paddingTop: 48,
    height: 160,
  },
  detailsContainer: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: theme.backgrounds.lightGray,
    borderRadius: 12,
  },

  detailLabel: {
    fontSize: theme.fonts.size.caption,
    color: theme.colors.textLight,
    marginTop: 12,
  },

  detailValue: {
    fontSize: theme.fonts.size.body,
    color: theme.colors.text,
    fontWeight: "500",
    marginTop: 4,
  },
  commentBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
  },
  commentInputContainer: {
    flex: 1,
    marginRight: 12,
  },
  sendIconTouchable: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 16,
  },
  commentContainer: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  commentCreatorNameText: {
    fontWeight: "bold",
    color: "#333",
  },
  contentText: {
    marginTop: 4,
    color: "#444",
  },
  dateText: {
    marginTop: 4,
    fontSize: 12,
    color: "#999",
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
});
