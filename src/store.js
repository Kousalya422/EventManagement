import { configureStore } from "@reduxjs/toolkit";
import eventReducer from './eventSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        events: eventReducer,
        users: userReducer,
    }
});