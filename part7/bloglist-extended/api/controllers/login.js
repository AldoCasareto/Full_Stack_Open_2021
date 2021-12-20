import bcrypt from 'bcrypt';
import express from 'express';
export const loginRouter = express.Router();
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

loginRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ username: body.username });

  if (user === null) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const passwordCorrect = await bcrypt.compare(
    body.password,
    user.passwordHash
  );

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).send({ token, username: user.username, name: user.name });
});
