import { AppDataSource } from '../config/data-source';

AppDataSource.initialize()
  .then(() => {
    return AppDataSource.runMigrations();
  })
  .then(() => {
    console.log('✅ Migrations ran successfully');
  })
  .catch((error) => {
    console.error('❌ Migration error:', error);
  });