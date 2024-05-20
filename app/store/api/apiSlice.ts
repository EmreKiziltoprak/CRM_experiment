import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../slices/registerSlice';

  const baseLink = "http://localhost:3307"

  
  export const api = createApi({
    reducerPath: 'apiz',
    baseQuery: fetchBaseQuery({ baseUrl: baseLink }),
    endpoints: (builder) => ({
      createUser: builder.mutation<any, User>({
        query: (userData) => ({
          url: 'users/register',
          method: 'POST',
          body: userData,
        }),
      }),
    }),
  });
  
  export const { useCreateUserMutation } = api;

