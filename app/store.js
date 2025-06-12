import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './services/userApi';
import { postsApi } from './services/postsApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userApi.middleware, postsApi.middleware),
});
