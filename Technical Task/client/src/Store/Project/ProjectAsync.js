import { createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from "../../Services/api";
import { setAllProjects, setCompleteProjects, setArchiveProjects, setPendingProjects } from "./ProjectSlice";


export const asyncCreateProject = createAsyncThunk(
    "CreateProject",
    async ({ body }, { getState, dispatch }) => {
        try {
            const res = await callApi({
                path: `project/create`,
                method: 'POST',
                body,
                isForm: true,
                token: getState().user.token,
            });
            console.log(res)
            if (res.success) {
                return res
            }
            if (res.success === false) {
                return res
            }
            return { success: true, d: 'data' }
        } catch (error) {
            console.log(error)
            return { success: false };
        }
    }
);

export const asyncGetProjects = createAsyncThunk(
    "GetProjects",
    async (id, { getState, dispatch }) => {
        try {
            const res = await callApi({
                path: `project/${id}`,
                token: getState().user.token,
            });
            console.log(res)
            if (res.success) {
                dispatch(setAllProjects(res.data))
                return res
            }
            if (res.success === false) {
                return res
            }
            return { success: true, d: 'data' }
        } catch (error) {
            console.log(error)
            return { success: false };
        }
    }
);
export const asyncDeleteProject = createAsyncThunk(
    "DeleteProject",
    async (id, { getState, dispatch }) => {
        try {
            const res = await callApi({
                path: `project/${id}`,
                method: 'DELETE',
                token: getState().user.token,
            });
            console.log(res)
            if (res.success) {
                return res
            }
            if (res.success === false) {
                return res
            }
            return { success: true, d: 'data' }
        } catch (error) {
            console.log(error)
            return { success: false };
        }
    }
);
export const asyncUpdateProject = createAsyncThunk(
    "UpdateProject",
    async ({ body }, { getState, dispatch }) => {
        try {
            const res = await callApi({
                path: `project/edit`,
                method: 'PUT',
                body,
                isForm: true,
                token: getState().user.token,
            });
            console.log(res)
            if (res.success) {
                return res
            }
            if (res.success === false) {
                return res
            }
            return { success: true, d: 'data' }
        } catch (error) {
            console.log(error)
            return { success: false };
        }
    }
);

