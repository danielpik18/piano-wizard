import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { auth, googleProvider } from "@/config/firebase-config";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { User } from "@/types/types";

type InitialState = {
    value: AuthState;
};

type AuthState = {
    loading: "idle" | "pending" | "succeeded" | "failed";
    isAuth: boolean;
    user: User;
};

const initialState = {
    value: {
        loading: "idle",
        isAuth: false,
        user: null!,
    },
} as InitialState;

// Sign in with email and password
export const signIn = createAsyncThunk(
    "auth/signIn",
    async (
        userData: { email: string; password: string },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const { email, password } = userData;
            const res = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error instanceof FirebaseError)
                return rejectWithValue(error.message);
        }
    }
);

// Sign in with Google
export const signInWithGoogle = createAsyncThunk(
    "auth/signInWithGoogle",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
        } catch (error) {
            if (error instanceof FirebaseError) return rejectWithValue(error);
        }
    }
);

export const userAuth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoggedIn: {
            reducer: (state = initialState, action: PayloadAction<User>) => {
                return {
                    value: {
                        ...state.value,
                        isAuth: true,
                        user: {
                            ...action.payload,
                        },
                    },
                };
            },
            prepare(uid: string, email: string, display_name: string) {
                return {
                    payload: {
                        uid,
                        email,
                        display_name,
                    },
                };
            },
        },

        setLoggedOut: (state) => {
            return {
                value: {
                    ...state.value,
                    isAuth: false,
                    user: null!,
                },
            };
        },
    },
    extraReducers: (builder) => {
        // Sign In Cases
        builder.addCase(signIn.pending, (state, action) => {
            state.value.loading = "pending";
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.value.loading = "succeeded";
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.value.loading = "failed";
            alert(action.payload);
        });

        // Sign In With Google Cases
        builder.addCase(signInWithGoogle.pending, (state, action) => {
            state.value.loading = "pending";
        });
        builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.value.loading = "succeeded";
            console.log("sign in w google fullfilled!");
        });
        builder.addCase(signInWithGoogle.rejected, (state, action) => {
            state.value.loading = "failed";
            console.log("SIGN in w Google REJECTED: ", action);
        });
    },
});

export const selectUserAuthLoading = (state: RootState) =>
    state.authReducer.value.loading;
export const selectUserIsAuth = (state: RootState) =>
    state.authReducer.value.isAuth;
export const selectUserEmail = (state: RootState) =>
    state.authReducer.value.user?.email;
export const selectUserDisplayName = (state: RootState) =>
    state.authReducer.value.user?.display_name;
export const selectUserUid = (state: RootState) =>
    state.authReducer.value.user?.uid;

export const { setLoggedIn, setLoggedOut } = userAuth.actions;
export default userAuth.reducer;
