"use client";

import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectUserAuthLoading,
    selectUserIsAuth,
    selectUserUid,
} from "@/redux/features/auth-slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
    emptyFavouriteChords,
    getUserFavouriteChords,
    selectFavouriteChords,
} from "@/redux/features/favourite-chords-slice";
import { Chord } from "@/types/types";

export default function FavouriteChords({
    setSelectedNotes,
}: {
    setSelectedNotes: Dispatch<SetStateAction<any[]>>;
}) {
    const isUserAuth = useSelector<RootState, boolean>(selectUserIsAuth);
    const authUserId = useSelector<RootState, string>(selectUserUid);
    const dispatch = useDispatch<AppDispatch>();

    const userFavChords = useSelector<RootState, Chord[]>(
        selectFavouriteChords
    );

    const loadFavouriteChord = (chord: Chord) => {
        console.log("chord:", chord);

        setSelectedNotes([...chord.notes]);
    };

    useEffect(() => {
        console.log("user auth changed, FROM FAV LIST", isUserAuth);

        if (isUserAuth) {
            dispatch(getUserFavouriteChords({ authUserId }));
        } else {
            dispatch(emptyFavouriteChords());
        }
    }, [isUserAuth]);

    useEffect(() => {
        console.log("user fav chords:", userFavChords);
    }, [userFavChords]);

    return (
        <div className="absolute left-4 top-50">
            <h1 className="text-slate-100 font-semibold text-xl">
                Favourite Chords
            </h1>
            <ul className="min-w-[200px] mt-4 gap-4 flex flex-col max-h-[420px] overflow-y-scroll">
                {userFavChords &&
                    userFavChords.length > 0 &&
                    userFavChords.map((chord) => (
                        <li
                            key={chord.name}
                            className="text-slate-300 cursor-pointer hover:text-slate-100"
                            onClick={() => loadFavouriteChord(chord)}
                        >
                            {chord.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
