import config from './common/config';
import { app } from './app';
import { createConnection } from 'typeorm';

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'database',
  synchronize: true,
})
  .then(async () => {
    app.listen((config.PORT = '4000'));
  })
  .catch((error) => {
    console.log(error);
  });
