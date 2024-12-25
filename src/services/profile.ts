// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { ProfileReducerArrayType, ProfileReducerType, SingleProfileReducerType} from '@/lib/definitions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth` }),
  tagTypes: ['Profiles'],
  endpoints: (build) => ({
    getProfiles: build.query<ProfileReducerArrayType, void>({
      query: () => '/',
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Profiles', _id } as const)),
              { type: 'Profiles', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Profiles', _id: 'LIST' }],
    }),
   
    getProfile: build.query<SingleProfileReducerType, string | undefined>({
      query: (userId) => `/get-profile/${userId}`,
      providesTags: (result, error, _id) => [{ type: 'Profiles', _id }],
    }),
    updateProfile: build.mutation<ProfileReducerType, Partial<ProfileReducerType>>({
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
      invalidatesTags: (result, error, { _id }) => [{ type: 'Profiles', _id }],
    })
  }),
})

export const {
  useGetProfilesQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = profileApi
// Export hooks for usage in functional components, which are
