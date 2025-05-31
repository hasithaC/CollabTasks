// Combine multiple reducers into a single root reducer.
// This setup allows modular management of different state slices.
import {combineReducers} from 'redux';
import {commonReducer} from './reducers';

const appReducer = combineReducers({
   // 'commonReducer' handles shared state like customers and opportunities
  commonReducer,
});

// Root reducer wrapper to allow future enhancements like global state reset on logout, etc.
const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
