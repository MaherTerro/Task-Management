import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "./Services/taskapi";
//we use store redux to use the reducers in all the project which are the api requests
export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware)
});
