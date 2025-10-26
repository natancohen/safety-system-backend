import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const ormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DB_PATH || 'db.sqlite',
  entities: [__dirname + '/../entities/*.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
};

export const AppDataSource = new DataSource(ormConfig);
