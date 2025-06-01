import { TaskPriority, TaskStatus } from "./Task";

export interface FilterOptions {
  priority?: TaskPriority;
  status?: TaskStatus;
};
