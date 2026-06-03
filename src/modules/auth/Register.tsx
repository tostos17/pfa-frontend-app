import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [roleId, setRoleId] = useState<number>(3); // Default to PLAYER (3)
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      // Direct call matching your backend's expected schema structure
      await axios.post('http://localhost:8080/api/auth/register', {
        email,
        password_hash: password, // Sending raw password to be hashed securely by Spring Security
        firstName,
        lastName,
        roleId: Number(roleId)
      });

      setSuccessMessage('Account created successfully! Redirecting to login...');
      setIsSubmitting(false);
      
      // Delays briefly so the user reads the success notification before transitioning
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error: any) {
      setIsSubmitting(false);
      setErrorMessage(
        error.response?.data?.message || 'An error occurred during account registration.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        
        {/* Header Branding Section */}
        <div>
          <div className="flex justify-center">
            <span className="text-4xl">🌱</span>
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-white">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Join the Academy management portal
          </p>
        </div>

        {/* Action Status Messages */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-lg flex items-center gap-2">
            <span className="font-semibold">Error:</span> {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-450 text-sm p-3 rounded-lg flex items-center gap-2">
            <span className="font-semibold">Success:</span> {successMessage}
          </div>
        )}

        {/* Input Interactive Registration Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-300 mb-1">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-600 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm"
                placeholder="Kylian"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-300 mb-1">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-600 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm"
                placeholder="Mbappé"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email-address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-600 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm"
              placeholder="player@academy.com"
            />
          </div>

          <div>
            <label htmlFor="password-field" className="block text-sm font-medium text-gray-300 mb-1">
              Secure Password
            </label>
            <input
              id="password-field"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-600 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Account Profile Role Context Selection Dropdown */}
          <div>
            <label htmlFor="role-select" className="block text-sm font-medium text-gray-300 mb-1">
              Portal Profile Role
            </label>
            <select
              id="role-select"
              value={roleId}
              onChange={(e) => setRoleId(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-600 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm"
            >
              <option value={3}>PLAYER — view roster & fixtures</option>
              <option value={4}>PARENT — track registered child profiles</option>
              <option value={2}>COACH — manage rosters & analytics</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold shadow-md transition-all ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Registering Account...' : 'Sign Up'}
            </button>
          </div>
        </form>

        {/* Navigation Link Toggle to Login Page */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-400">
            Already possess an active profile?{' '}
            <Link to="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              Sign In here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;