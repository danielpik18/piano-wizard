import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import favouriteChordsReducer from "./features/favourite-chords-slice";

const reducer = combineReducers({
    authReducer,
    favouriteChordsReducer,
});

export const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
