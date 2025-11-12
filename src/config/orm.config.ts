import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

export const ormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DB_PATH || 'db.sqlite',
  entities: [__dirname + '/../entities/*.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  synchronize: false,
  migrationsRun: !isProd,
  logging: true,
  dropSchema: false,
};

export const AppDataSource = new DataSource(ormConfig);
