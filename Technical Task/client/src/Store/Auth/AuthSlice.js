import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: null,
};

export const authRegister = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {};
            state.token = null;
        },
        setUser: (state, { payload }) => ({ ...state, ...payload }),

    },
});

export const { logout, setUser } = authRegister.actions;
export default authRegister.reducer;