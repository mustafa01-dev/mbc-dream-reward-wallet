import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const users: any[] = [];

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name, email,
      password: hashedPassword,
      wallet: { balance: 250.50, totalRewards: 15, claimedRewards: 8, pendingRedemptions: 2 },
    };
    users.push(user);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.status(201).json({ token, user: { ...user, password: undefined } });
  } catch (e) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { ...user, password: undefined } });
  } catch (e) {
    res.status(500).json({ message: 'Login failed' });
  }
});

router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ ...user, password: undefined });
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
