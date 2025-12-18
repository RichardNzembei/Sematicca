'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAccessToken } from '@sematicca/react';
export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser, isLoggingIn, error, token } = useAccessToken();
    useEffect(() => {
        if (token) router.push('/dashboard');
    }, [token, router]);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await loginUser({ email, password });
        } catch (err) {
            console.error('Login failed:', err);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold mx-auto">
                        S
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign in to your Sematicca account</p>
                </div>

                {error && (
                    <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                        <div className="flex">
                            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                            <div className="ml-3">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Email */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                disabled={isLoggingIn}
                                className="appearance-none rounded-lg w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                disabled={isLoggingIn}
                                className="appearance-none rounded-lg w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !isLoggingIn) handleSubmit(e);
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoggingIn}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
                    >
                        {isLoggingIn ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
