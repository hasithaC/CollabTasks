import { supabase } from "@/lib/supabase";
import { CreateTaskInput, Task, Comment, FilterOptions } from "@/models";

export const fetchUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email")
    .order("created_at", { ascending: false });

  return { data, error };
};

export const createTask = async (task: CreateTaskInput) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        title: task.title,
        description: task.description ?? null,
        assignee_id: task.assigneeId,
        creator_id: task.creatorId,
        priority: task.priority,
      },
    ])
    .select();

  return { data, error };
};

export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
      id,
      title,
      description,
      status,
      priority,
      assignee_id,
      creator_id,
      created_at,
      assignee:assignee_id (
        id,
        name,
        email
      ),
      creator:creator_id (
        id,
        name,
        email
      )
    `
    )
    .order("created_at", { ascending: false });

  // Normalize the result if needed (to match your Task type)
  const tasks: Task[] | undefined = data?.map((task) => ({
    ...task,
    assignee: task.assignee,
    creator: task.creator,
  }));

  return { data: tasks, error };
};

export const addCommentToTask = async ({
  content,
  taskId,
  creatorId,
}: {
  content: string;
  taskId: number;
  creatorId: string;
}) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        content,
        task_id: taskId,
        creator_id: creatorId,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error adding comment:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const getCommentsForTask = async (
  taskId: number
): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      created_at,
      creator:creator_id (
        id,
        name,
        email
      )
    `
    )
    .eq("task_id", taskId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error.message);
    throw new Error(error.message);
  }

  // 🔧 Fix incorrect creator type if returned as an array
  const normalizedData: Comment[] = (data || []).map((comment: any) => ({
    ...comment,
    creator: Array.isArray(comment.creator)
      ? comment.creator[0]
      : comment.creator,
  }));

  return normalizedData;
};

export const updateTaskPriority = async (
  taskId: number,
  newPriority: "low" | "medium" | "high"
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ priority: newPriority })
    .eq("id", taskId)
    .select()
    .single();

  if (error) {
    console.error("Error updating task priority:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const updateTaskStatus = async (
  taskId: number,
  newStatus: "pending" | "in_progress" | "completed"
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status: newStatus })
    .eq("id", taskId)
    .select()
    .single();

  if (error) {
    console.error("Error updating task status:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const getFilteredTasks = async ({ priority, status }: FilterOptions): Promise<Task[]> => {
  let query = supabase
    .from("tasks")
    .select(
      `
      id,
      title,
      description,
      priority,
      status,
      created_at,
      creator:creator_id(id, name, email),
      assignee:assignee_id(id, name, email)
      `
    )
    .order("created_at", { ascending: false });

  if (priority) {
    query = query.eq("priority", priority);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching tasks:", error.message);
    throw new Error(error.message);
  }

  return data as Task[];
};