"use client";

import {
    selectUserAuthLoading,
    selectUserIsAuth,
} from "@/redux/features/auth-slice";
import { NextComponentType } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function WithAuth(Component: NextComponentType) {
    const Auth = (props: any) => {
        const isUserAuth = useSelector(selectUserIsAuth);
        const loading = useSelector(selectUserAuthLoading);
        const router = useRouter();

        useEffect(() => {
            //console.log("Loading: ", loading);

            if (loading === "succeeded") {
                if (!isUserAuth) {
                    router.push("/login");
                }
            }
        }, [loading, isUserAuth, router]);

        return <Component {...props} />;
    };

    return Auth;
}
