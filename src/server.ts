import { createConnection } from 'typeorm';
import config from './common/config';
import { app } from './app';

import ConnectionOptions from './common/ConnectionOptions';

createConnection(ConnectionOptions)
  .then(async () => {
    app.listen((config.PORT = '4000'));
  })
  .catch((error) => {
    console.log(error);
  });
