// Combine multiple reducers into a single root reducer.
// This setup allows modular management of different state slices.
import { combineReducers } from "redux";
import { commonReducer, sessionReducer } from "./reducers";

const appReducer = combineReducers({
  commonReducer,
  sessionReducer,
});

// Root reducer wrapper to allow future enhancements like global state reset on logout, etc.
const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
