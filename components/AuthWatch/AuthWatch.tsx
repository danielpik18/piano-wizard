"use client";

import { auth } from "@/config/firebase-config";
import { setLoggedIn, setLoggedOut } from "@/redux/features/auth-slice";
import { AppDispatch } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthWatch() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            //console.log("auth state changed");

            if (user) {
                //console.log("logged in user:", user);

                dispatch(setLoggedIn(user.uid, user.email!, user.displayName!));
            } else {
                dispatch(setLoggedOut());
            }
        });
    }, []);

    return <></>;
}
