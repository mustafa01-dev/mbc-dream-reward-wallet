import express from 'express';

const router = express.Router();

router.get('/balance', (req, res) => {
  res.json({
    balance: 250.50,
    totalRewards: 15,
    claimedRewards: 8,
    pendingRedemptions: 2,
  });
});

router.get('/transactions', (req, res) => {
  const mockTransactions = [
    { id: '1', date: new Date(), description: 'Reward Claimed', amount: 50, status: 'completed' },
    { id: '2', date: new Date(Date.now() - 86400000), description: 'Redemption', amount: 25, status: 'completed' },
    { id: '3', date: new Date(Date.now() - 172800000), description: 'Bonus', amount: 10, status: 'pending' },
  ];
  res.json(mockTransactions);
});

router.post('/redeem', (req, res) => {
  const { rewardId, amount } = req.body;
  if (!rewardId || !amount) return res.status(400).json({ message: 'Missing fields' });
  res.json({ message: 'Redeemed successfully', transactionId: Math.random().toString(36).substr(2, 9), amount });
});

export default router;
