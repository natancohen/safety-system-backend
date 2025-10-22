/// <reference types="node" />
import { DataSource, DataSourceOptions } from 'typeorm';
import { Event } from '../entities/event.entity';
import { User } from '../entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const ormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DB_PATH || 'db.sqlite',
  entities: [Event, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
};

export const AppDataSource = new DataSource(ormConfig);
