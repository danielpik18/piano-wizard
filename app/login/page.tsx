"use client";

import Link from "next/link";
import { FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
    selectUserIsAuth,
    signIn,
    signInWithGoogle,
} from "@/redux/features/auth-slice";
import { AppDispatch } from "@/redux/store";

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const isUserAuth = useSelector(selectUserIsAuth);

    const handleSignIn = async (event: FormEvent) => {
        event.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email) {
            return alert("Wrong email...");
        }
        if (!password) {
            return alert("Wrong password...");
        }

        dispatch(signIn({ email, password }));
    };

    const handleSignInWithGoogle = async (event: FormEvent) => {
        event.preventDefault();

        dispatch(signInWithGoogle());
    };

    useEffect(() => {
        if (isUserAuth) router.push("/");
    }, [isUserAuth]);

    return (
        <main className="flex flex-col items-start p-4 rounded w-full max-w-md bg-slate-100">
            <h1 className="text-xl mb-2 uppercase font-bold">Login</h1>

            <form
                className="w-full flex flex-col gap-3 my-5"
                onSubmit={(event) => handleSignIn(event)}
            >
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-xs">
                        Email Address
                    </label>
                    <input
                        id="email"
                        className="p-2"
                        type="text"
                        placeholder="Email Address"
                        ref={emailRef}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        className="p-2"
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                    />
                </div>

                <button
                    className="bg-emerald-600 text-slate-100 uppercase font-semibold p-2 rounded ease-in duration-100 hover:opacity-80"
                    type="submit"
                >
                    Sign In
                </button>
            </form>

            <button
                onClick={handleSignInWithGoogle}
                className="flex items-center gap-2 font-semibold text-blue-600 hover:opacity-75 cursor-pointer"
            >
                <img src="/img/google-logo.svg" alt="" />
                Sign in with Google
            </button>

            <Link
                className="font-semibold text-blue-600 hover:opacity-75 mt-5 block"
                href={"/register"}
            >
                Or... register your account
            </Link>
        </main>
    );
}
