export interface CreateTaskInput {
  title: string;
  description?: string;
  assigneeId: string;
  creatorId: string;
}
