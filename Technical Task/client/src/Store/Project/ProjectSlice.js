import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "Pins",
    initialState: {
        allProjects: [],
        pendingProjects: [],
        completeProjects: [],
        archiveProjects: [],
        searchValue: null
    },
    reducers: {
        setAllProjects: (state, { payload }) => ({ ...state, ...payload }),
        setCompleteProjects: (state, { payload }) => ({ ...state, completeProjects: payload }),
        setArchiveProjects: (state, { payload }) => ({ ...state, archiveProjects: payload }),
        setPendingProjects: (state, { payload }) => ({ ...state, pendingProjects: payload }),
        setSearchValue: (state, { payload }) => ({ ...state, searchValue: payload })
    },
});

export const { setAllProjects, setCompleteProjects, setArchiveProjects, setPendingProjects, setSearchValue } = projectSlice.actions;
export default projectSlice.reducer;