import React, { useState, useEffect } from 'react';
import { loginWithEmailAndPassword } from '../firebase';
import { toast } from 'react-hot-toast';

interface LoginProps {
  onLogin: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginWithEmailAndPassword(username, password);
      localStorage.setItem('isAdmin', 'true');
      onLogin(true);
      toast.success('Login success!');
    } catch (err: any) {
      if (err.code === 'auth/invalid-login-credentials') {
        setError('Invalid username or password');
      } else {
        setError('An error occurred during login.');
      }
      if (localStorage.getItem('isAdmin')) {
        localStorage.removeItem('isAdmin');
        onLogin(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen" id="login-section">
      <h2 className="font-bold text-2xl md:text-3xl text-header-bg mb-4">Admin Login</h2>
      {error && <div className="text-error mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 rounded-lg" id="login-form">
        <div className="mb-3">
          <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor="username"> 
            Username
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor="password"> 
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 btn-login font-bold rounded-lg flex justify-center items-center transition-all duration-300"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
