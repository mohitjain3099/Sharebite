import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './user-slice';

const persistConfig = {
  key: 'user',
  storage,
};

// Persist the user slice in session
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

// Create the store and configure it with the persisted reducer
export const store = configureStore({
  reducer: {
    [userSlice.name]: persistedReducer,
  },
});

export const persistor = persistStore(store);