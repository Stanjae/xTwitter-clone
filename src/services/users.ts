import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getUsersQueryType, getUsersType } from '@/lib/definitions'

export interface User {
  id: number
  email: string
  token: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api` }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    getUsers: build.query<getUsersType[], void>({
      query: () => '/auth/getusers',
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Auth', _id } as const)),
              { type: 'Auth', id: 'AuthLIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Auth', id: 'AuthLIST' }],
    }),

    getNoOfUsers: build.query<getUsersType[], getUsersQueryType>({
      query: ({currentUserId, limit, skip=0}) =>(
        `/auth/get-some-users?currentUserId=${currentUserId}&limit=${limit}&skip=${skip}`
      ),
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Auth', _id } as const)),
              { type: 'Auth', id: 'AuthLIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Auth', id: 'AuthLIST' }],
    }),

    getSearchUsers: build.query<getUsersType[], string|undefined>({
      query: (query) =>(
        `/auth/search?query=${query}`
      ),
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Auth', _id } as const)),
              { type: 'Auth', id: 'AuthLIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Auth', id: 'AuthLIST' }],
    }),

    // Google authentication endpoint
    googleLogin: build.mutation<User, string>({
      query: (googleToken) => ({
        url: '/auth/google',
        method: 'POST',
        body: { token: googleToken }, // Send the Google token to the backend
      }),
      // Optionally handle cache invalidation here
      invalidatesTags: ['Auth'],
    }),

    // Email/password authentication endpoint
    emailLogin: build.mutation<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Auth'],
    }),

    // Register a new user
    emailRegister: build.mutation<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/auth/register',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Auth'],
    }),

    // Get user profile or logged-in user data
    getUser: build.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),

    // Post-related endpoints (same as the ones you had)

  }),
})

export const {
  useGoogleLoginMutation,
  useEmailLoginMutation,
  useEmailRegisterMutation,
  useGetUserQuery,
  useGetSearchUsersQuery,
  useGetUsersQuery,
  useGetNoOfUsersQuery
} = authApi
