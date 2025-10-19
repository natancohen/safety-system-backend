import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { EventModule } from './event.module';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || 'db.sqlite',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.TYPEORM_SYNC === 'true' || true,
      logging: true,
    }),
    UserModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}