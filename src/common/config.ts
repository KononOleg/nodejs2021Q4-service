import dotenv from 'dotenv';
import path from 'path';
import LogLevel from '../LogLevel/LogLevel';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});
export default {
  PORT: (process.env.PORT = '4000'),
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  ALL_LOG: path.join(__dirname, '../../', process.env.ALL_LOG as string),
  ERROR_LOG: path.join(__dirname, '../../', process.env.ERROR_LOG as string),
  LOG_LEVEL: LogLevel[(process.env.LOG_LEVEL as keyof typeof LogLevel) || 4],
};
