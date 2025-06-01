import { FetchedUser } from "./FetchedUser";

export interface Comment {
   id: number;
  content: string;
  created_at: string;
  creator?: {
    id: string;
    name: string;
    email: string;
  };
}
