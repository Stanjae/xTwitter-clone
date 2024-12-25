import { FollowMutateType, FollowStatus,} from '@/lib/definitions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/follow` }),
  tagTypes: ['Follow'],
  endpoints: (build) => ({
    getProfiles: build.query<FollowStatus[], void>({
      query: () => '/',
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Follow', _id } as const)),
              { type: 'Follow', _id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Follow', _id: 'LIST' }],
    }),

     addFollow: build.mutation<FollowMutateType, Partial<FollowMutateType>>({
          query(data) {
            const {authorId, followerId} = data
            return {
              url: `/create`,
              method: 'POST',
              body:{authorId, followerId}
            }
          },
          // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
          // that newly created post could show up in any lists.
          invalidatesTags: [{ type: 'Follow', id: 'LIST' }],
        }),
   
    getAuthorFollowCount: build.query<FollowStatus, string | undefined>({
      query: (userId) => `/get-author-stats/${userId}`,
      providesTags: (_id) => [{ type: 'Follow', _id }],
    }),
    isFollowing: build.query<{isFollowing:boolean | undefined}, {authorId:string | undefined; userId:string | undefined}>({
        query: ({authorId, userId}) =>  `/is-following?authorId=${authorId}&userId=${userId}`,
        providesTags: (_id) => [{ type: 'Follow', _id }],
      }),
    deleteFollow: build.mutation<FollowMutateType, Partial<FollowMutateType>>({
      query(data) {
        const {authorId, followerId} = data
       return {
          url: `/delete`,
          method: 'DELETE',
          body:{authorId, followerId},
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error,{ _id }) => {
        console.log(result, error);
       return [{ type: 'Follow', _id }]
      },
    })
  }),
})

export const {
  useGetProfilesQuery,
  useGetAuthorFollowCountQuery,
  useDeleteFollowMutation,
  useIsFollowingQuery,
  useAddFollowMutation
} = followApi
// Export hooks for usage in functional components, which are
