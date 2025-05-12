import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAE9SbIqkKn20uTrCNm6C_TnL9Wk2CElpM",
    authDomain: "moviewatchlist-c45ec.firebaseapp.com",
    projectId: "moviewatchlist-c45ec",
    storageBucket: "moviewatchlist-c45ec.firebasestorage.app",
    messagingSenderId: "1078350159009",
    appId: "1:1078350159009:web:857be6d16b2a12f17be4e0"
};

// For debugging
console.log('Firebase Config:', {
    apiKey: firebaseConfig.apiKey ? 'Present' : 'Missing',
    authDomain: firebaseConfig.authDomain ? 'Present' : 'Missing',
    projectId: firebaseConfig.projectId ? 'Present' : 'Missing'
});

// Initialize Firebase
let app;

if (!getApps().length) {
    try {
        app = initializeApp(firebaseConfig);
        console.log('Firebase initialized successfully with config:', firebaseConfig);
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        throw new Error('Failed to initialize Firebase. Please check your configuration.');
    }
} else {
    app = getApp();
    console.log('Using existing Firebase app');
}

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase instances
export { auth, db };

// Debug: Log auth state changes
auth.onAuthStateChanged(
    (user) => {
        if (user) {
            console.log('User is signed in:', user.uid);
        } else {
            console.log('No user is signed in');
        }
    },
    (error) => {
        console.error('Auth state change error:', error);
    }
);
