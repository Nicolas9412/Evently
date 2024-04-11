import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [AuthModule, TypeOrmModule.forFeature([Event])],
})
export class EventModule {}
