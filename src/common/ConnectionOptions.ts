import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';
import User from '../resources/users/user.model';
import Board from '../resources/board/board.model';
import ColumnEntity from '../resources/board/column.model';
import Task from '../resources/tasks/task.model';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  entities: [User, Board, ColumnEntity, Task],
};

export default ConnectionOptions as ConnectionOptions;
