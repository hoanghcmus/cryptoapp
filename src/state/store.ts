import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';
import { reducerTransform } from './reducers/reducerTransform';

const persistConfig = {
  key: 'root',
  version: 1,
  transforms: [reducerTransform],
  storage: AsyncStorage,
  throttle: 1000,
  whitelist: ['app'],
  writeFailHandler: () => {},
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
