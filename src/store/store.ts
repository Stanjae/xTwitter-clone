import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tweetApi } from '../services/tweets'
import { authApi } from '@/services/users'
import { profileApi } from '@/services/profile'
import { followApi } from '@/services/follow'
import { commentApi } from '@/services/comment'
import { likeApi } from '@/services/likes'
import { trendsApi } from '@/services/trends'
import { notifyApi } from '@/services/notification'

export const store = configureStore({
  reducer: {
    sessionAuth: authReducer,
    [tweetApi.reducerPath]: tweetApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]:profileApi.reducer,
    [followApi.reducerPath]:followApi.reducer,
    [commentApi.reducerPath]:commentApi.reducer,
    [likeApi.reducerPath]:likeApi.reducer,
    [trendsApi.reducerPath]:trendsApi.reducer,
    [notifyApi.reducerPath]:notifyApi.reducer
    // Add other reducers here
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( notifyApi.middleware, trendsApi.middleware, likeApi.middleware, tweetApi.middleware, commentApi.middleware, followApi.middleware, authApi.middleware, profileApi.middleware),

})

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
