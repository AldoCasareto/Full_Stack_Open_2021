import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../app';
import { variousBlogs } from './list_helper.test.js';
import { blogsInDb } from '../utils/list_helper.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user.js';

const api = supertest(app);
import Blog from '../models/blog.js';

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(variousBlogs);
});

describe('when there are some blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(variousBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.map((r) => r.title);
    expect(titles).toContain('React patterns');
  });

  test('seeing specific blog', async () => {
    const blogsAtStart = await blogsInDb();
    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
    expect(resultBlog.body).toEqual(processedBlogToView);
  });
});

describe('blogs can be created', () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});

    const testUser = await new User({
      username: 'Aldo Casareto',
      passwordHash: await bcrypt.hash('secret', 10),
    }).save();

    const userForToken = {
      username: 'Aldo Casareto',
      id: testUser.id,
    };
    token = jwt.sign(userForToken, process.env.SECRET);
    return token;
  });
  test('blogs can be created', async () => {
    const newBlog = {
      url: 'www.peru21.com',
      title: 'Peru21',
      author: 'Cateriano',
      userId: '619b71819b47064bfd8e3033',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(variousBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain('Peru21');
  });

  test('likes in blog default 0 if info is missing', async () => {
    const newBlog = {
      url: 'www.peru21.com',
      title: 'Peru23',
      author: 'Aldo',
      userId: '619b71819b47064bfd8e3033',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test('if url and title are missing', async () => {
    const newBlog = {
      author: 'Aldo',
      likes: 45,
      userId: '619b71819b47064bfd8e3033',
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(variousBlogs.length);
  });
});

describe('blog post can be deleted', () => {
  let token = null;
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const testUser = await new User({
      username: 'Aldo Casareto',
      passwordHash: await bcrypt.hash('secret', 10),
    }).save();

    const userForToken = {
      username: 'Aldo Casareto',
      id: testUser.id,
    };

    token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      url: 'www.peru21.com',
      title: 'Peru21',
      author: 'Cateriano',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    return token;
  });

  test('blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

test('the unique identifier of a blog is _id', async () => {
  const blogs = await Blog.find({});
  expect(blogs[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
