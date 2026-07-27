import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      {/* Navigation */}
      <nav className="bg-blue-950 bg-opacity-80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400">MBC Wallet</h1>
          <div className="flex gap-4">
            <button onClick={() => router.push('/login')} className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-blue-900 transition">
              Login
            </button>
            <button onClick={() => router.push('/register')} className="px-4 py-2 bg-cyan-400 text-blue-900 rounded font-bold hover:bg-cyan-300 transition">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-center text-white">
        <h2 className="text-6xl font-bold mb-6">Dream Reward Wallet</h2>
        <p className="text-xl text-gray-300 mb-8">Earn, manage, and redeem rewards effortlessly</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => router.push('/register')} className="px-8 py-3 bg-cyan-400 text-blue-900 rounded font-bold hover:scale-105 transition">
            Get Started
          </button>
          <button className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded font-bold hover:bg-cyan-400 hover:text-blue-900 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-white text-center mb-12">Why MBC Wallet?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '🎁', title: 'Easy Rewards', desc: 'Collect rewards from all your favorite brands' },
            { icon: '💳', title: 'Digital Wallet', desc: 'Secure and accessible anytime, anywhere' },
            { icon: '📊', title: 'Real-time Updates', desc: 'Watch your balance grow instantly' },
            { icon: '🔐', title: 'Bank-Level Security', desc: 'Your data is always protected' },
            { icon: '🌍', title: 'Global Access', desc: 'Use your wallet anywhere worldwide' },
            { icon: '⚡', title: 'Instant Redemption', desc: 'Redeem rewards without hassle' },
          ].map((f, i) => (
            <div key={i} className="bg-blue-800 bg-opacity-50 p-6 rounded-lg border border-cyan-400 text-white">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h4 className="text-xl font-bold mb-2">{f.title}</h4>
              <p className="text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 MBC Dream Reward Wallet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
