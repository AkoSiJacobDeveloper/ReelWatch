import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    AuthError
} from "firebase/auth";
import { auth } from "./firebase";

// Sign up
export const register = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Log in
export const login = async (email: string, password: string) => {
    try {
        console.log('Login attempt with:', { email });
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful:', userCredential);
        return userCredential;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Log out
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};