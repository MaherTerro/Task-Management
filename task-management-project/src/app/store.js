import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "./Services/taskapi";

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware)
});