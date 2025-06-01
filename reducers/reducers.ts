import { SET_LOADING, SET_USER } from "@/actions/type";
import createReducer from "@/lib/createReducer";
import { User } from "@/models";

const sessioInitialState = {
  user: null,
};

const commonInitialState = {
  isLoading: false,
};

export const sessionReducer = createReducer(sessioInitialState, {
  [SET_USER](state: any, action: { payload: User }) {
    return {
      ...state,
      user: action.payload,
    };
  },
});

export const commonReducer = createReducer(commonInitialState, {
  [SET_LOADING](state: any, action: { payload: boolean }) {
    return {
      ...state,
      isLoading: action.payload,
    };
  },
});