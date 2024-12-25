import { AuthSlicePayloadType, AuthSliceType } from '@/lib/definitions'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'




const initialState: AuthSliceType = {
  currentUser:{_id:'', token:null, fullName:'', email:'', picture:'', username:'' }
}

export const authSlice = createSlice({
  name: 'sessionAuth',
  initialState,
  reducers: {
      loginSession: (state, action:PayloadAction<AuthSlicePayloadType>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // immutable state based off those changes
      state.currentUser = {fullName:action.payload?.user?.fullName,
         _id:action?.payload?.user?._id, token:action?.payload?.token, 
         email:action?.payload?.user?.email, 
         picture:action?.payload?.user?.picture, 
         username:action?.payload?.user?.username}
    },
    logoutSession: (state) => {
      state.currentUser = {_id:'', token:null, fullName:'', email:'', picture:'', username:'' }
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginSession, logoutSession} = authSlice.actions

export default authSlice.reducer