import { info, error } from './logger.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const requestLogger = (request, response, next) => {
  info('Method:', request.method);
  info('Path:  ', request.path);
  info('Body:  ', request.body);
  info('---');
  next();
};

export const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (err, request, response, next) => {
  error(err.message);

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message });
  }

  next(err);
};

export const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

export const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    } else {
      req.user = user;
    }
  }

  next();
};
