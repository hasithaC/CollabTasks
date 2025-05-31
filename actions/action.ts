import { SET_USER } from "./type";

export const setUser = (user: string) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
