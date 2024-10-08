/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    currentUser:null,
    error:null,
    loading:false,
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>
        {
            state.loading = true;
        },
        signInSuccess:(state,action)=>
        {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        }
        ,
        signInFailure:(state,action)=>
        {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart:(state)=>
        {
            state.loading = true;
            state.error = null;
        },
        updateSuccess:(state,action)=>
        {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        }
        ,
        updateFailure:(state,action)=>
        {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart:(state)=>
        {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess:(state,action)=>
        {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        }
        ,
        deleteUserFailure:(state,action)=>
        {
            state.loading = false;
            state.error = action.payload;
        },
        signOutSuccess:(state,action)=>
            {
                state.currentUser = null;
                state.error = null;
                state.loading = false;
            }
            ,
    }
})
export const {signInStart,signInSuccess,signInFailure,updateStart,updateSuccess,updateFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,signOutSuccess} = userSlice.actions;
export default userSlice.reducer;