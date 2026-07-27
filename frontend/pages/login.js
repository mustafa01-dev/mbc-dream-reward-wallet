import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex items-center justify-center">
      <div className="w-full max-w-md bg-blue-800 bg-opacity-50 border border-cyan-400 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">Login</h1>
        {error && <div className="bg-red-600 text-white p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-blue-900 border border-cyan-400 text-white p-3 rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-blue-900 border border-cyan-400 text-white p-3 rounded" required />
          <button type="submit" disabled={loading} className="w-full bg-cyan-400 text-blue-900 font-bold py-3 rounded hover:bg-cyan-300 transition">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-white text-center mt-4">Don't have an account? <Link href="/register" className="text-cyan-400 hover:underline">Sign up</Link></p>
      </div>
    </div>
  );
}
