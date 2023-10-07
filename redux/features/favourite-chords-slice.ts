import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Chord } from "@/types/types";

import { FirebaseError } from "firebase/app";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase-config";

type InitialState = {
    value: FavouriteChordsState;
};

type FavouriteChordsState = {
    loading: "idle" | "pending" | "succeeded" | "failed";
    chords: Chord[];
};

const initialState = {
    value: {
        loading: "idle",
        chords: [],
    },
} as InitialState;

// Sign in with email and password
export const getUserFavouriteChords = createAsyncThunk(
    "favouriteChords/getUserFavouriteChords",
    async (data: { authUserId: string }, { rejectWithValue, dispatch }) => {
        try {
            const q = query(
                collection(db, "favouriteChords"),
                where("user_id", "==", data.authUserId)
            );
            const res = await getDocs(q);
            const chords: Chord[] = [];

            if (res.empty) return;

            res?.forEach((doc) => {
                const chordData = doc.data();

                chords.push({
                    id: doc.id,
                    name: chordData.name,
                    notes: chordData.notes,
                    user_id: chordData.user_id,
                });
            });

            return chords;
        } catch (error) {
            if (error instanceof FirebaseError)
                return rejectWithValue(error.message);
        }
    }
);

export const favouriteChords = createSlice({
    name: "favouriteChords",
    initialState,
    reducers: {
        emptyFavouriteChords: (state) => {
            return {
                value: {
                    ...state.value,
                    chords: [],
                },
            };
        },
    },
    extraReducers: (builder) => {
        // Get auth user favourite chords
        builder.addCase(getUserFavouriteChords.pending, (state, action) => {
            state.value.loading = "pending";
        });
        builder.addCase(getUserFavouriteChords.fulfilled, (state, action) => {
            state.value.loading = "succeeded";

            console.log("getting fav chords...");

            if (!action.payload || action.payload?.length! === 0) {
                state.value.chords = [];
                return console.log("No fav chords found...");
            }

            //console.log("chords:", action.payload);

            state.value.chords = [...action.payload!];
        });
        builder.addCase(getUserFavouriteChords.rejected, (state, action) => {
            state.value.loading = "failed";
            alert(action.payload);
        });
    },
});

export const selectFavouriteChords = (state: RootState) =>
    state.favouriteChordsReducer.value.chords;

export const { emptyFavouriteChords } = favouriteChords.actions;
export default favouriteChords.reducer;
