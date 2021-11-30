import Blog from '../models/blog.js';
import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { userExtractor } from '../utils/middleware.js';
export const blogsRouter = express.Router();

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body;
  const user = req.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.json(savedBlog);
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if(!blog) { 
    return res.status(400).json({error:'the blog does not exist'});
  }

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).json({ error: 'this blog post does not belong to you' });
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
  };
  const updateBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updateBlog);
});
