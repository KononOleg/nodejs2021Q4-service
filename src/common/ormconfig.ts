import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const ormconfig = {
  type: 'postgres',
  name: 'postgres-app-connection',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  entities: [process.env.TYPEORM_ENTITY],
  migrations: [process.env.TYPEORM_MIGRATION],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATION_DIR,
    entitiesDir: process.env.TYPEORM_ENTITY_DIR,
  },
};

export default ormconfig as ConnectionOptions;
