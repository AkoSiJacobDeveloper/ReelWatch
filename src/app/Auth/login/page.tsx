"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { login } from "@/lib/auth";
import Link from 'next/link';
import { Film, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { testFirebaseAuth } from '@/lib/firebase-debug';
import FirebaseTest from '@/components/FirebaseTest';

interface LoginError {
    message: string;
    field?: 'email' | 'password' | 'general';
}

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<LoginError | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    // Add useEffect to test Firebase configuration on page load
    useEffect(() => {
        const testConfig = async () => {
            try {
                const result = await testFirebaseAuth();
                console.log('Firebase configuration test:', result);
            } catch (error) {
                console.error('Firebase configuration test failed:', error);
                setError({
                    message: 'Failed to initialize Firebase. Please try again later.',
                    field: 'general'
                });
            }
        };
        testConfig();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error?.field === name) {
            setError(null);
        }
    };

    const validateForm = (): boolean => {
        if (!formData.email) {
            setError({ message: 'Email is required', field: 'email' });
            return false;
        }
        if (!formData.email.includes('@')) {
            setError({ message: 'Please enter a valid email address', field: 'email' });
            return false;
        }
        if (!formData.password) {
            setError({ message: 'Password is required', field: 'password' });
            return false;
        }
        if (formData.password.length < 6) {
            setError({ message: 'Password must be at least 6 characters', field: 'password' });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            console.log('Attempting login with:', { email: formData.email });
            const result = await login(formData.email, formData.password);
            console.log('Login successful:', result);
            toast.success('Login successful!');
            router.push('/home');
        } catch (err: any) {
            console.error('Login error:', err);
            let errorMessage = 'Failed to log in. Please try again.';
            
            // Handle specific Firebase auth errors
            if (err.code) {
                switch (err.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address format.';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many failed attempts. Please try again later.';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'Network error. Please check your connection.';
                        break;
                    default:
                        errorMessage = err.message || 'An unexpected error occurred.';
                }
            }
            
            setError({ message: errorMessage, field: 'general' });
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                {/* Logo and Title Section */}
                <div className="text-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h1>
                        <p className="text-gray-400 mb-6">Sign in to continue your movie journey</p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6">
                    {error && (
                        <div className={`bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-center ${
                            error.field === 'general' ? 'animate-shake' : ''
                        }`}>
                            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span>{error.message}</span>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A31621] text-white pl-10 transition-colors ${
                                        error?.field === 'email' ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="you@example.com"
                                    required
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                        </div>
                        
                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A31621] text-white pl-10 pr-10 transition-colors ${
                                        error?.field === 'password' ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="••••••••"
                                    required
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-[#A31621] focus:ring-[#A31621] border-gray-600 rounded bg-gray-700"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                                Remember me for 30 days
                            </label>
                        </div>
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center bg-[#A31621] hover:bg-[#A31621] text-white py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Login <ArrowRight size={18} className="ml-2" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                    <p className="text-gray-400">
                        Don't have an account?{' '}
                        <Link href="/Auth/register" className="text-[#A31621] hover:underline font-medium transition-colors">
                            Register
                        </Link>
                    </p>
                </div>
                
                {/* Social Login Options */}
                <div className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-black text-gray-400">Or continue with</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="py-3 px-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg flex items-center justify-center text-gray-300 transition-all"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                <path fill="none" d="M1 1h22v22H1z" />
                            </svg>
                            Google
                        </button>
                        
                        <button
                            type="button"
                            className="py-3 px-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg flex items-center justify-center text-gray-300 transition-all"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                            </svg>
                            Facebook
                        </button>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        By signing in, you agree to our{' '}
                        <Link href="/terms" className="underline hover:text-gray-400 transition-colors">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="underline hover:text-gray-400 transition-colors">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
            <FirebaseTest />
        </div>
    );
}

// bg-gradient-to-b from-gray-900 to-black