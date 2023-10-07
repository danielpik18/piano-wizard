"use client";

import React, { useEffect } from "react";
import { auth } from "@/config/firebase-config";
import Link from "next/link";
//import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
    selectUserDisplayName,
    selectUserEmail,
    selectUserIsAuth,
    setLoggedOut,
} from "@/redux/features/auth-slice";
import { RootState } from "@/redux/store";

export default function UserNav() {
    //const { user } = useContext(AuthContext) as UserContext;
    const userIsAuth = useSelector<RootState, boolean>(selectUserIsAuth);
    const userDisplayName = useSelector<RootState, string>(
        selectUserDisplayName
    );
    const userEmail = useSelector<RootState, string>(selectUserEmail);
    const router = useRouter();

    const dispatch = useDispatch();

    const logout = () => {
        signOut(auth).then(() => {
            dispatch(setLoggedOut());
        });
        router.push("/login");
    };

    return (
        <div className="absolute top-4 right-50 md:right-4">
            {userIsAuth ? (
                <div className="text-slate-100 flex items-center">
                    <span className="pr-2">
                        {userDisplayName ? userDisplayName : userEmail}
                    </span>
                    <button
                        className="flex items-center gap-1 hover:underline pl-2 border-l-solid border-l-2 border-l-slate-100"
                        onClick={logout}
                    >
                        <Image
                            className="w-[20px] h-[20px]"
                            width={20}
                            height={20}
                            src="/img/user.svg"
                            alt=""
                        />
                        Log out
                    </button>
                </div>
            ) : (
                <div>
                    <Link
                        className="flex items-center gap-1 text-slate-100 hover:underline"
                        href={"/login"}
                    >
                        <Image
                            width={20}
                            height={20}
                            className="w-[20px]"
                            src="/img/sign-in.svg"
                            alt=""
                        />
                        Sign In
                    </Link>
                </div>
            )}
        </div>
    );
}
