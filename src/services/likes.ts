import { AddLikeParamsType, FollowStatus, LikeCountType,} from '@/lib/definitions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




export const likeApi = createApi({
  reducerPath: 'likeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/like` }),
  tagTypes: ['Like'],
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
              ...result.map(({ _id }) => ({ type: 'Like', _id } as const)),
              { type: 'Like', _id: 'LIKELIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Like', _id: 'LIKELIST' }],
    }),

     addLike: build.mutation<AddLikeParamsType, Partial<AddLikeParamsType>>({
          query({tweetId, userId, authorId}) {
            return {
              url: `/add`,
              method: 'POST',
              body:{tweetId, userId, authorId}
            }
          },
          // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
          // that newly created post could show up in any lists.
          invalidatesTags: [{ type: 'Like', id: 'LIKELIST' }],
        }),
   
    getLikeCount: build.query<LikeCountType, string | undefined>({
      query: (tweetId) => `/like-count/${tweetId}`,
      providesTags: (_id) => [{ type: 'Like', _id }],
    }),
    isLiked: build.query<{_id:string | undefined; isLiked:boolean | undefined}, Partial<AddLikeParamsType>>({
        query: ({tweetId, userId}) =>  `/like-status?tweetId=${tweetId}&userId=${userId}`,
        providesTags: (_id) => [{ type: 'Like', _id }],
      }),
    deleteLike: build.mutation<{ success: boolean; id: string | undefined }, Partial<AddLikeParamsType>>({
      query(data) {
        const {tweetId, userId} = data
       return {
          url: `/delete`,
          method: 'DELETE',
          body:{tweetId, userId},
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id }) => {
        console.log(result, error);
        return [{ type: 'Like', _id}]
      },
    })
  }),
})

export const {
  useGetProfilesQuery,
  useGetLikeCountQuery,
  useDeleteLikeMutation,
  useIsLikedQuery,
  useAddLikeMutation
} = likeApi
// Export hooks for usage in functional components, which are
