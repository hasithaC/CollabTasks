export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id?: string;
  creator_id?: string;
  created_at: string;
  assignee?: {
    id: string;
    name: string;
    email: string;
  };
  creator?: {
    id: string;
    name: string;
    email: string;
  };
};

export type TaskStatus = "pending" | "completed";
export type TaskPriority = "low" | "medium" | "high";
