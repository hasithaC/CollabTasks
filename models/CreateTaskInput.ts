import { TaskPriority } from "./Task";

export interface CreateTaskInput {
  title: string;
  description?: string;
  assigneeId: string;
  creatorId: string;
  priority: TaskPriority;
}
