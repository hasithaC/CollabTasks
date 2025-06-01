import { supabase } from "@/lib/supabase";
import { CreateTaskInput } from "@/models";

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
      },
    ])
    .select();

  return { data, error };
};
