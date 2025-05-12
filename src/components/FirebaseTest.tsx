'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

export default function FirebaseTest() {
    const [status, setStatus] = useState<string>('Testing...');

    useEffect(() => {
        const testFirebase = async () => {
            try {
                // Test Firebase initialization
                const config = auth.app.options;
                console.log('Testing Firebase configuration:', {
                    appName: auth.app.name,
                    apiKey: config.apiKey,
                    authDomain: config.authDomain,
                    projectId: config.projectId
                });

                // Test authentication state
                const unsubscribe = auth.onAuthStateChanged((user) => {
                    console.log('Auth state:', user ? 'Signed in' : 'Not signed in');
                });

                setStatus('Firebase initialized successfully');
                return () => unsubscribe();
            } catch (error) {
                console.error('Firebase test error:', error);
                setStatus('Firebase initialization failed');
            }
        };

        testFirebase();
    }, []);

    return (
        <div className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
            <h3 className="font-bold mb-2">Firebase Status</h3>
            <p>{status}</p>
        </div>
    );
} 