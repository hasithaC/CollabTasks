import { SET_USER } from "@/actions/type";
import createReducer from "@/lib/createReducer";

const initialState = {
  user: "",
};

export const commonReducer = createReducer(initialState, {
  [SET_USER](state: any, action: { payload: string }) {
    return {
      ...state,
      user: action.payload,
    };
  },
});
