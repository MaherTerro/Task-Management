import {createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
  
  export const taskApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:5000/api"
    }),
    endpoints: (builder) => ({
      Tasks: builder.mutation({
        query: (userid) => ({
          url: "/getAll",
          method: "POST",
          body: { userid },
        })
      }),
        addTask: builder.mutation({
          query: (task) => ({
            url: "/post",
            method: "POST",
            body: task
          })
        }),
        signup: builder.mutation({
            query: (task) => ({
              url: "/signup",
              method: "POST",
              body: task
            })
          }),
          login: builder.mutation({
            query: (task) => ({
              url: "/login",
              method: "POST",
              body: task
            })
          }),
          updateTask: builder.mutation({
            query: ({ id, ...rest }) => ({
              url: `/update/${id}`,
              method: "PUT",
              body: rest
            }),
            
          }),
        deleteTask: builder.mutation({
          query: (id) => ({
            url: `/delete/${id}`,
            method: "DELETE"
          })
        }),
        CompleteTask: builder.mutation({
          query: (id) => ({
            url: `/complete/${id}`,
            method: "PUT"
          })
        })
      })
  });
  export const {
    useTasksMutation,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useSignupMutation,
    useLoginMutation,
    useCompleteTaskMutation
  } = taskApi;