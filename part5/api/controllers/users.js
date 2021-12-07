import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
export const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
  const body = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  if (!body.password || !body.username) {
    return res.status(400).json({
      error: 'missing username or password',
    });
  } else if (body.password.length < 3 || body.username.length < 3) {
    return res.status(400).json({
      error: 'username or password is too short',
    });
  } else {
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();
    res.json(savedUser);
  }
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    user: 1,
  });
  res.json(users.map(user=>user.toJSON()));
});
