import express from 'express';

const router = express.Router();

const rewards = [
  { id: '1', name: 'Gaming Bundle', category: 'Gaming', value: 50, description: '$50 gaming credit' },
  { id: '2', name: 'Shopping Voucher', category: 'Shopping', value: 100, description: '$100 shopping voucher' },
  { id: '3', name: 'Food Discount', category: 'Food', value: 30, description: '30% off restaurants' },
  { id: '4', name: 'Travel Credit', category: 'Travel', value: 200, description: '$200 travel credit' },
];

router.get('/', (req, res) => {
  res.json(rewards);
});

router.get('/:id', (req, res) => {
  const reward = rewards.find(r => r.id === req.params.id);
  reward ? res.json(reward) : res.status(404).json({ message: 'Not found' });
});

router.post('/claim', (req, res) => {
  const { rewardId } = req.body;
  if (!rewardId) return res.status(400).json({ message: 'Reward ID required' });
  const reward = rewards.find(r => r.id === rewardId);
  reward ? res.json({ message: 'Claimed', reward, claimedAt: new Date() }) : res.status(404).json({ message: 'Not found' });
});

export default router;
