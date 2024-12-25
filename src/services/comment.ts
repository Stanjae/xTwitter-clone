import { AddCommentType, CommentListType } from './../lib/definitions';
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { getCommentsQueryType } from '@/lib/definitions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/comment` }),
  tagTypes: ['Comments'],
  endpoints: (build) => ({
    getTweetComments: build.query<CommentListType, getCommentsQueryType>({
      query: ({tweetId, replyingTo}) => `/get-comments?tweetId=${tweetId}&replyingTo=${replyingTo}`,
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Comments', _id } as const)),
              { type: 'Comments', id: 'COMMENTLIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Comments', id: 'COMMENTLIST' }],
    }),
    addComment: build.mutation<AddCommentType, Partial<AddCommentType>>({
      query(data) {
        return {
          url: `add`,
          method: 'POST',
          body:data,
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Comments', id: 'COMMENTLIST' }],
    }),
    /* getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }), */
    /* updatePost: build.mutation<Post, Partial<Post>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `post/${id}`,
          method: 'PUT',
          body,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }), */
    deleteComment: build.mutation<{ success: boolean; id: number }, {authorId:string | undefined, commentId:string | undefined}>({
      query({authorId, commentId}) {
        return {
          url: `delete`,
          method: 'DELETE',
          body:{authorId, commentId}
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: ( _id) => [{ type: 'Comments', _id }],
    }),
  }),
})

export const {
  useGetTweetCommentsQuery,
  useAddCommentMutation,
  //useGetPostQuery,
  //useUpdatePostMutation,
  useDeleteCommentMutation,
} = commentApi
