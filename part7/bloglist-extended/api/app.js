import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { usersRouter } from './controllers/users.js';
import { blogsRouter } from './controllers/blogs.js';
import { info, error } from './utils/logger.js';
import { loginRouter } from './controllers/login.js';
import { tokenExtractor, userExtractor } from './utils/middleware.js';
import { testingRouter } from './controllers/testing.js';

import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from './utils/middleware.js';
import 'express-async-errors';

export const app = express();

import { MONGODB_URI } from './utils/config.js';

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    info('connected to mongo');
  })
  .catch((err) => {
    error(err);
  });

app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(tokenExtractor);
app.use(userExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(requestLogger);

app.use(unknownEndpoint);
app.use(errorHandler);
