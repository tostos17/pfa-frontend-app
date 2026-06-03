import React, { useState } from 'react';
import type { FormEvent } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Using React's Generic FormEvent targeted directly at an HTMLFormElement
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.message || 'An error occurred during authentication.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        
        {/* Header Block */}
        <div>
          <div className="flex justify-center">
            <span className="text-4xl">⚽</span>
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-white">
            Academy Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to manage players, matches, and analytics
          </p>
        </div>

        {/* Dynamic Error Alerts */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-lg flex items-center gap-2">
            <span className="font-semibold">Error:</span> {errorMessage}
          </div>
        )}

        {/* Input Interactive Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            
            {/* Email Field Group */}
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                placeholder="coach@academy.com"
              />
            </div>

            {/* Password Field Group */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submission Control */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500 font-semibold shadow-md transition-all ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
          <div className="text-center mt-4">
  <p className="text-sm text-gray-400">
    New to the Academy portal?{' '}
    <Link to="/register" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
      Create an account
    </Link>
  </p>
</div>
        </form>
      </div>
    </div>
  );
};

export default Login;