import { auth } from './firebase';

export const testFirebaseAuth = async () => {
    try {
        // Test auth state
        const currentUser = auth.currentUser;
        console.log('Current user:', currentUser);

        // Test auth configuration
        const config = auth.app.options;
        console.log('Firebase config:', {
            apiKey: config.apiKey ? 'Present' : 'Missing',
            authDomain: config.authDomain ? 'Present' : 'Missing',
            projectId: config.projectId ? 'Present' : 'Missing'
        });

        return {
            isInitialized: auth.app.name === '[DEFAULT]',
            hasApiKey: !!config.apiKey,
            hasAuthDomain: !!config.authDomain,
            hasProjectId: !!config.projectId
        };
    } catch (error) {
        console.error('Firebase test error:', error);
        throw error;
    }
}; 