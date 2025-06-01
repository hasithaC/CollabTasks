import { SET_ALL_TASK, SET_LOADING, SET_USER } from "./type";
import { Task, User } from "../models";

export const setUser = (user: User | null) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setLoading = (loading: boolean) => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};

export const setAllTask = (tasks: Task[]) => {
  return {
    type: SET_ALL_TASK,
    payload: tasks,
  };
};