// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { MernTweetType, TweetsResponse } from '@/lib/definitions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Post {
  id: number
  name: string
}



export const tweetApi = createApi({
  reducerPath: 'tweetApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/tweets` }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<TweetsResponse, any>({
      query: () => '/',
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Posts', id: 'LIST' }],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query(body) {
        return {
          url: `/create`,
          method: 'POST',
          body,
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    getPost: build.query<MernTweetType, string | undefined>({
      query: (id) => `/status/${id}`,
      providesTags: ( _id) => [{ type: 'Posts', _id }],
    }),
    getUserPosts: build.query<MernTweetType[], string | undefined>({
      query: (id) => `/userposts/${id}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Posts', _id } as const)),
              { type: 'Posts', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Posts', _id: 'LIST' }],
    }),
    getSearchPosts: build.query<MernTweetType[], string | undefined>({
      query: (query) => `/searchposts?query=${query}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Posts', _id } as const)),
              { type: 'Posts', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Posts', _id: 'LIST' }],
    }),
    updatePost: build.mutation<MernTweetType, Partial<MernTweetType>>({
      query(data) {
        const { _id } = data
        ///console.log("update post:", data, id, body)
       return {
          url: `/update/${_id}`,
          method: 'PATCH',
          body:data,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id }) => [{ type: 'Posts', _id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: string | undefined }, string | undefined>({
      query(id) {
        return {
          url: `/delete/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: ( id) => [{ type: 'Posts', _id:id }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetSearchPostsQuery,
  useAddPostMutation,
  useGetPostQuery,
  useGetUserPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = tweetApi
// Export hooks for usage in functional components, which are
