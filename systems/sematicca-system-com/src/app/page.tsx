'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MailIcon, LockIcon, UserIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useUser } from '@sematicca/react';
import toast from 'react-hot-toast';

export default function SignUp() {
  const router = useRouter();
  const { upsertUser, isUpsertingUser } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    terms: '',
  });

  const validate = () => {
    console.log('🔍 Starting validation...');
    const newErrors: any = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      console.log('❌ Validation failed: Full name is empty');
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      console.log('❌ Validation failed: Email is empty');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email address';
      console.log('❌ Validation failed: Invalid email format');
    }

    if (!password) {
      newErrors.password = 'Password is required';
      console.log('❌ Validation failed: Password is empty');
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      console.log('❌ Validation failed: Password too short');
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms';
      console.log('❌ Validation failed: Terms not accepted');
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;

    if (isValid) {
      console.log('✅ Validation passed');
    } else {
      console.log('❌ Validation failed with errors:', newErrors);
      toast.error('Please fix the errors in the form');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Form submission started');

    if (!validate()) {
      console.log('⚠️ Form submission aborted due to validation errors');
      return;
    }

    const userData = {
      kv: {
        full_name: fullName.trim(),
        email: email.toLowerCase().trim(),
        password: password,
        is_active: true,
      },
    };

    console.log('📤 Attempting to create user account:', {
      full_name: userData.kv.full_name,
      email: userData.kv.email,
      is_active: userData.kv.is_active,
    });

    try {
      const loadingToast = toast.loading('Creating your account...');

      await upsertUser(userData);

      toast.dismiss(loadingToast);
      console.log('✅ Account created successfully');
      toast.success('Account created successfully! Redirecting to login...', {
        duration: 3000,
        icon: '🎉',
      });

      setTimeout(() => {
        console.log('🔄 Redirecting to login page');
        router.push('/login');
      }, 1500);

    } catch (err: any) {
      console.error('❌ Error creating account:', err);

      // Handle different error scenarios
      let errorMessage = 'Something went wrong. Please try again.';

      if (err.status === 409) {
        // Email already taken
        errorMessage = 'This email is already registered';
        console.log('⚠️ Conflict: Email already exists:', email);

        // Check if there are specific issues in the error response
        if (err.issues && Array.isArray(err.issues)) {
          const emailIssue = err.issues.find((issue: any) =>
              issue.path && issue.path.includes('email')
          );

          if (emailIssue) {
            console.log('📋 Email conflict details:', emailIssue);
            errorMessage = emailIssue.error || 'E-mail is already taken';
          }
        }

        // Highlight the email field error
        setErrors(prev => ({
          ...prev,
          email: 'This email is already registered',
        }));

        toast.error(errorMessage, {
          duration: 4000,
          icon: '⚠️',
        });

      } else if (err.status === 400) {
        // Bad request
        console.log('⚠️ Bad request error:', err.message);
        errorMessage = err.message || 'Invalid input. Please check your details.';
        toast.error(errorMessage, {
          duration: 4000,
        });

      } else if (err.status === 500) {
        // Server error
        console.log('🔥 Server error occurred');
        errorMessage = 'Server error. Please try again later.';
        toast.error(errorMessage, {
          duration: 4000,
        });

      } else if (err.message) {
        // Generic error with message
        console.log('⚠️ Error:', err.message);
        errorMessage = err.message;
        toast.error(errorMessage, {
          duration: 4000,
        });

      } else {
        // Unknown error
        console.log('❓ Unknown error occurred:', err);
        toast.error(errorMessage, {
          duration: 4000,
        });
      }

      console.log('🔚 Error handling completed');
    }
  };

  const handleGoogleSignUp = () => {
    console.log('🔐 Google sign-up button clicked');
    toast('Google sign-up coming soon!', {
      icon: '🚀',
    });
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
              S
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Start your 14-day free trial with Sematicca
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Full Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    required
                    className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) {
                        setErrors(prev => ({ ...prev, fullName: '' }));
                      }
                    }}
                />
                {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span> {errors.fullName}
                    </p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="email"
                    required
                    className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: '' }));
                      }
                    }}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span> {errors.email}
                    </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className={`appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors(prev => ({ ...prev, password: '' }));
                      }
                    }}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span> {errors.password}
                    </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <div className="flex items-center">
                <input
                    id="terms"
                    type="checkbox"
                    required
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.terms}
                  </p>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button
                  type="submit"
                  disabled={isUpsertingUser}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium disabled:opacity-70 disabled:cursor-not-allowed transition"
              >
                {isUpsertingUser ? 'Creating account...' : 'Sign up'}
              </button>

              <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign up with Google
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
}