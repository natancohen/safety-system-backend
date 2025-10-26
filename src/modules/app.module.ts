import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { EventModule } from './event.module';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ormConfig } from '../config/orm.config';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
