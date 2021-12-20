import express from 'express';
import Blog from '../models/blog.js';
export const testingRouter = express.Router();
import User from '../models/user.js';

testingRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  console.log('hello');
  res.status(204).end();
});
