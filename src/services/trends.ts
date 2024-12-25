import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {TrendsType } from '@/lib/definitions'



export const trendsApi = createApi({
  reducerPath: 'trendsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/trends` }),
  tagTypes: ['Trends'],
  endpoints: (build) => ({
    getTrends: build.query<TrendsType[], void>({
      query: () => '/',
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Trends', _id } as const)),
              { type: 'Trends', id: 'AuthLIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Trends', id: 'AuthLIST' }],
    })

  }),
})

export const {
  useGetTrendsQuery
} = trendsApi
