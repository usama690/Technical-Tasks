import { combineReducers, configureStore } from "@reduxjs/toolkit";
import projectReducer from './Project/ProjectSlice'
import authReducer from './Auth/AuthSlice'
import storage from 'redux-persist/lib/storage';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const allreducers = combineReducers({
    user: authReducer,
    project: projectReducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, allreducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            serializableCheck: false
        }),
});

export const persistor = persistStore(store);