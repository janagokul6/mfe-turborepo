import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const USERS_API =
  process.env.USERS_API_URL ||
  'https://api.jsoning.com/mock/public/users';
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = 4001;

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post('/login', async (req, res) => {
  const email = req.body?.email;
  const username = req.body?.username;
  if (!email || !username) {
    res.status(400).json({ error: 'email and username required' });
    return;
  }

  try {
    const r = await fetch(USERS_API);
    if (!r.ok) {
      res.status(502).json({ error: 'users api down' });
      return;
    }
    const data = await r.json();
    const list = Array.isArray(data) ? data : data.data || data.users || [];
    const user = list.find(
      (u: any) =>
        u.email?.toLowerCase() === email.toLowerCase() &&
        String(u.username || '').toLowerCase() === username.toLowerCase()
    );
    if (!user) {
      res.status(401).json({ error: 'invalid login' });
      return;
    }

    const id = String(user.id || user._id || user.email);
    const name =
      [user.firstname, user.lastname].filter(Boolean).join(' ') ||
      user.username ||
      user.email;
    const token = jwt.sign({ userId: id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });
    res.json({
      token,
      user: { id, email: user.email, name },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'login failed' });
  }
});

app.listen(PORT, () => {
  console.log(`auth-api on ${PORT}`);
});
