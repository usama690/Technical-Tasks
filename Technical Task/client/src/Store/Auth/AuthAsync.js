import { createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from '../../Services/api'
import { setUser } from "./AuthSlice";

export const asyncSignup = createAsyncThunk(
    "auth/signup",
    async (body, { dispatch }) => {
        try {
            const res = await callApi({
                path: `user/signup`,
                method: "POST",
                body,
            });
            console.log(res);
            if (res.success) {
                return res;
            } else if (res.success === false) {
                return res;
            }
            return res;
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
);

export const asyncSignin = createAsyncThunk(
    "auth/signin",
    async (body, { dispatch }) => {
        try {
            const res = await callApi({
                path: `user/signin`,
                method: "POST",
                body,
            });
            console.log(res);
            if (res.success) {
                dispatch(setUser({ user: res.data, token: res.token }));
                return res;
            } else if (res.success === false) {
                return res;
            }
            return res;
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
);
