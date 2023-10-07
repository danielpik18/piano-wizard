"use client";

import Link from "next/link";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";

export default function Register() {
    const router = useRouter();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (!email) {
            return alert("Wrong email...");
        }
        if (!password) {
            return alert("Wrong password...");
        }
        if (!confirmPassword) {
            return alert("Wrong password confirmation...");
        }

        if (password != confirmPassword) {
            return alert("Passwords don't match");
        }

        const res = await registerUser(email, password);

        if (!res) return;

        return router.push("/");
    };

    return (
        <main className="p-4 rounded w-full max-w-md bg-slate-100">
            <h1 className="text-xl mb-2 uppercase font-bold">Register</h1>

            <form
                className="flex flex-col gap-3 my-5"
                onSubmit={(event) => handleRegister(event)}
            >
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-xs">
                        Email Address
                    </label>
                    <input
                        id="email"
                        className="p-2"
                        type="email"
                        placeholder="Email Address"
                        ref={emailRef}
                        required
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
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs" htmlFor="confirm-password">
                        Confirm password
                    </label>
                    <input
                        id="confirm-password"
                        className="p-2"
                        type="password"
                        placeholder="Password"
                        ref={confirmPasswordRef}
                        required
                    />
                </div>

                <button
                    className="bg-emerald-600 text-slate-100 uppercase font-semibold p-2 rounded ease-in duration-100 hover:opacity-80"
                    type="submit"
                >
                    Register
                </button>
            </form>

            <Link
                className="font-semibold text-blue-600 hover:opacity-75"
                href={"/login"}
            >
                Or... Sign in
            </Link>
        </main>
    );
}
