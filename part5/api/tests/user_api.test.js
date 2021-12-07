import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { app } from '../app.js';
import supertest from 'supertest';
const api = supertest(app);
import { usersInDb } from '../utils/list_helper.js';

describe('when there is initially one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();
  });

  test('creation of a username', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'pedro',
      name: 'Pedro',
      password: 'salainen',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test('creation of a username with short password', async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: 'ped',
      name: 'Pedro',
      password: 'sa',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
  test('username must be unique', async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: 'root',
      name: 'Pedro',
      password: 'salainen',
    };
    const result = await api.post('/api/users').send(newUser).expect(400);
    const usersAtEnd = await usersInDb();
    expect(result.body.error).toContain('`username` to be unique');

    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
