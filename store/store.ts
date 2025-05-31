import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../reducers';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

// Persist Redux state using AsyncStorage to retain app data across sessions.
// Only 'commonReducer' is persisted to avoid unnecessary storage of other reducers.
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['commonReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor};
