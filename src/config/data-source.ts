import { DataSource } from 'typeorm';
import { Event } from '../entities/event.entity';
import { User } from '../entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Event, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});