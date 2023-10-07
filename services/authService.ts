import { auth } from "@/config/firebase-config";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const registerUser = async (email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        if (!res) return;

        return true;
    } catch (error: unknown) {
        if (error instanceof FirebaseError) alert(error.message);
    }
};
