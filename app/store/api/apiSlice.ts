import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession, signOut } from "next-auth/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RegisterUserDTO, User } from "../slices/registerSlice";
import { ILoginSuccess } from "../interface/auth";


export interface ApiResponse<T> {
  statusCode?: number;
  status?: number;
  success?: boolean;
  errorName?: string;
  data?: T extends null ? any : T; // Success response data (when T is not null)
  message?: string;
}


const baseLink = "http://localhost:3307";
const baseQuery = fetchBaseQuery({ baseUrl: baseLink });

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  // Get the access token from the session
  const session = await getSession();
  const accessToken = session?.user?.accessToken;

  // Add the Authorization header if token exists
  if (accessToken) {
    if (typeof args === "string") {
      args = {
        url: args,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    } else {
      args.headers = {
        ...args.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }

  // Initial API request
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 Unauthorized errors
/*   if (result.error && result.error.status === 401) {
    // Attempt to refresh token (if your backend has this endpoint)
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult.data) {
      // If refresh is successful, retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, sign out the user
      await signOut();
      return result; // Or throw an error to handle the failed refresh
    }
  } */

  return result;
};

 /* 
 {
	"statusCode": 401,
	"errorName": "UNAUTHORIZED",
	"message": "Unauthorized"
}
 */

export const api = createApi({
  reducerPath: "apiz",
  baseQuery: baseQueryWithReauth,
  // global configuration for the api
  refetchOnFocus: false,
  tagTypes: ['Post', 'User'],

  endpoints: (builder) => ({
    //CREATE USER ENDPOINT
    createUser: builder.mutation<ApiResponse<ILoginSuccess | null>, User>({
      query: (userData) => ({
        url: "users/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation<ApiResponse<ILoginSuccess | null>, { email: string, password: string }>({
      query: (userData) => ({
        url: "users/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ['Post'],

    }),



  }),

});

export const { useCreateUserMutation, useLoginUserMutation } = api;
