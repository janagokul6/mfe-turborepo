import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const app = express();
const PORT = 4002;
const JWT_SECRET = process.env.JWT_SECRET ;
const MONGODB_URI = process.env.MONGODB_URI || '';

let dbConnected = false;
const DB_ERR =
  'database not connected — set MONGODB_URI in .env and make sure MongoDB is reachable';

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [{ productId: String, title: String, price: Number, qty: Number }],
  total: Number,
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', orderSchema);

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
    ],
    credentials: true,
  })
);

app.get('/health', (_req, res) => {
  res.json({ ok: dbConnected, db: dbConnected ? 'connected' : 'disconnected' });
});

app.post('/orders', auth, requireDb, async (req: any, res) => {
  const { items, total } = req.body || {};
  if (!items || !items.length) {
    res.status(400).json({ error: 'empty order' });
    return;
  }
  const orderTotal =
    total || items.reduce((s: number, i: any) => s + i.price * i.qty, 0);

  try {
    const order = await Order.create({
      userId: req.userId,
      items,
      total: orderTotal,
    });
    res.status(201).json(order);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'save failed' });
  }
});

app.get('/orders', auth, requireDb, async (req: any, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'fetch failed' });
  }
});

function requireDb(_req: any, res: any, next: any) {
  if (!dbConnected || mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: DB_ERR });
    return;
  }
  next();
}

function auth(req: any, res: any, next: any) {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ error: 'no token' });
    return;
  }
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'bad token' });
  }
}

async function connectDb() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI missing');
    dbConnected = false;
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    dbConnected = true;
    console.log('mongo connected');
  } catch (e) {
    console.error('mongo connect failed', e);
    dbConnected = false;
  }
}

app.listen(PORT, async () => {
  console.log(`order-api on ${PORT}`);
  await connectDb();
});
