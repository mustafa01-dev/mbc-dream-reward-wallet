import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex items-center justify-center">
      <div className="w-full max-w-md bg-blue-800 bg-opacity-50 border border-cyan-400 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">Sign Up</h1>
        {error && <div className="bg-red-600 text-white p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full bg-blue-900 border border-cyan-400 text-white p-3 rounded" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full bg-blue-900 border border-cyan-400 text-white p-3 rounded" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full bg-blue-900 border border-cyan-400 text-white p-3 rounded" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full bg-blue-900 border border-cyan-400 text-white p-3 rounded" required />
          <button type="submit" disabled={loading} className="w-full bg-cyan-400 text-blue-900 font-bold py-3 rounded hover:bg-cyan-300 transition">
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-white text-center mt-4">Already have an account? <Link href="/login" className="text-cyan-400 hover:underline">Sign in</Link></p>
      </div>
    </div>
  );
}
