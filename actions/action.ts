import { SET_LOADING, SET_USER } from "./type";
import { User } from "../models";

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
