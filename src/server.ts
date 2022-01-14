import config from './common/config';
import { app } from './app';
import { createConnection } from 'typeorm';
import User from './resources/users/user.model';
import Board from './resources/board/board.model';
import ColumnEntity from './resources/board/column.model';

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'database',
  synchronize: true,
  entities: [User, Board, ColumnEntity],
})
  .then(async () => {
    app.listen((config.PORT = '4000'));
  })
  .catch((error) => {
    console.log(error);
  });
