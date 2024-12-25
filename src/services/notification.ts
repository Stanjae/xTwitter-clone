// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { NotificationType, NotificationTypeArray} from '@/lib/definitions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type NotifyParams = {
  authorId: string | undefined
}



export const notifyApi = createApi({
  reducerPath: 'notifyApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/notify` }),
  tagTypes: ['Notify'],
  endpoints: (build) => ({
    getUserNotifications: build.query<NotificationTypeArray, NotifyParams>({
      query: ({authorId}) => `/get-notifications/${authorId}`,
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Notify', _id } as const)),
              { type: 'Notify', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Notify', id: 'LIST' }],
    }),
    getUnreadCount: build.query<{count:string}, NotifyParams>({
      query: ({authorId}) => `/unread-count/${authorId}`,
      providesTags: ( _id) => [{ type: 'Notify', _id }],
    }),
    markRead: build.mutation<NotificationType , Partial<{notificationId:string | undefined; _id:string | undefined}>>({
      query({notificationId}) {
       return {
          url: `/mark-read/${notificationId}`,
          method: 'PATCH',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id }) => [{ type: 'Notify', _id }],
    })
  }),
})

export const {
  useGetUserNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkReadMutation,
} = notifyApi
// Export hooks for usage in functional components, which are
