import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/User';

// Define a type for the slice state for user
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null as User | null,
    },
    reducers: {
        // Reducer functions to handle login, logout and set user
        login: (state, action: PayloadAction<User>) => {
            state.userData = action.payload;
        },
        logout: (state) => {
            state.userData = null;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.userData = action.payload;
        },
    },
});

// Selectors to get user data
export const selectUser = (): any => (state: any) => {
    return state.user.userData;
};

// Action creators are generated for each case reducer function
export const { login, logout, setUser } = userSlice.actions;

export default userSlice;