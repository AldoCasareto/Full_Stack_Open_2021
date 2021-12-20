import { app } from './app.js';
import http from 'http';
import { PORT } from './utils/config.js';
import { info } from './utils/logger.js';

const server = http.createServer(app);

server.listen(PORT, () => {
  info(`connected to ${PORT}`);
});
