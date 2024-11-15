// src/authService.js
import { auth } from './firebase'; // Import the auth instance from your firebase.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Function to register a user
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the user object
    } catch (error) {
        throw new Error(error.message); // Handle errors
    }
};

// Function to log in a user
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the user object
    } catch (error) {
        throw new Error(error.message); // Handle errors
    }
};