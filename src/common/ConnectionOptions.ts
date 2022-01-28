import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';
import Board from '../entity/board.model';
import ColumnEntity from '../entity/column.model';
import Task from '../entity/task.model';
import User from '../entity/user.model';

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
  entities: [User, Task, Board, ColumnEntity],
};

export default ConnectionOptions as ConnectionOptions;
