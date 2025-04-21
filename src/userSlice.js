import { createSlice, current } from "@reduxjs/toolkit";

const userSlice =createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        users:[],
    },
    reducers: {
        signup: (state,action)=>{
            state.users.push(action.payload);
        },
        login: (state,action)=>{
            const user = state.users.find(u=>u.email=== action.payload.email &&u.password ===action.payload.password);
            state.currentUser=user|| null;
        },
        logout: (state) => {
            state.currentUser=null;
        }
    }
});

export const {signup, login, logout}= userSlice.actions;
export default userSlice.reducer;
