import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchData(token);
  }, []);

  const fetchData = async (token) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [userRes, walletRes, rewardsRes, transRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/balance`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rewards`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/transactions`, { headers }),
      ]);
      setUser(userRes.data);
      setWallet(walletRes.data);
      setRewards(rewardsRes.data);
      setTransactions(transRes.data);
    } catch (error) {
      localStorage.removeItem('token');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) return <div className="min-h-screen bg-blue-900 flex items-center justify-center text-white text-2xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      {/* Nav */}
      <nav className="bg-blue-950 border-b border-cyan-400 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400">MBC Wallet</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Wallet Balance */}
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg p-8 mb-8 text-blue-900">
          <p className="text-sm font-medium mb-2">Total Balance</p>
          <h2 className="text-5xl font-bold mb-4">${wallet?.balance.toFixed(2)}</h2>
          <p className="text-sm opacity-75">Available for redemption</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-800 bg-opacity-50 border border-cyan-400 rounded-lg p-6">
            <p className="text-gray-300 text-sm mb-2">Total Rewards</p>
            <p className="text-3xl font-bold">{wallet?.totalRewards || 0}</p>
          </div>
          <div className="bg-blue-800 bg-opacity-50 border border-cyan-400 rounded-lg p-6">
            <p className="text-gray-300 text-sm mb-2">Claimed Rewards</p>
            <p className="text-3xl font-bold">{wallet?.claimedRewards || 0}</p>
          </div>
          <div className="bg-blue-800 bg-opacity-50 border border-cyan-400 rounded-lg p-6">
            <p className="text-gray-300 text-sm mb-2">Pending Redemptions</p>
            <p className="text-3xl font-bold">{wallet?.pendingRedemptions || 0}</p>
          </div>
        </div>

        {/* Rewards */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Available Rewards</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {rewards.map((r) => (
              <div key={r.id} className="bg-blue-800 bg-opacity-50 border border-cyan-400 rounded-lg p-6 hover:border-cyan-300 transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold">{r.name}</h4>
                    <p className="text-gray-400 text-sm">{r.category}</p>
                  </div>
                  <span className="text-2xl font-bold text-cyan-400">${r.value}</span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{r.description}</p>
                <button className="w-full bg-cyan-400 text-blue-900 font-bold py-2 rounded hover:bg-cyan-300 transition">Redeem</button>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Recent Transactions</h3>
          <div className="bg-blue-800 bg-opacity-50 border border-cyan-400 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-t border-cyan-400 hover:bg-blue-900 transition">
                    <td className="px-6 py-4 text-sm">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">{t.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold">${t.amount}</td>
                    <td className="px-6 py-4 text-sm"><span className={`px-3 py-1 rounded text-xs font-semibold ${t.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
