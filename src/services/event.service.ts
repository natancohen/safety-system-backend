import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { CreateEventDto } from '../dto/event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async create(dto: Partial<Event>) {
    const event = this.eventRepo.create(dto);
    return await this.eventRepo.save(event);
  }

  async findAll() {
    return await this.eventRepo.find();
  }

  async findOne(id: number) {
    const event = await this.eventRepo.findOneBy({ id });
    if (!event) throw new NotFoundException(`Event ${id} not found`);
    return event;
  }

  async update(id: number, dto: Partial<Event>) {
    const event = await this.eventRepo.findOneBy({ id });
    if (!event) throw new NotFoundException(`Event ${id} not found`);
    await this.eventRepo.update(id, dto);
    return this.eventRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const event = await this.eventRepo.findOneBy({ id });
    if (!event) throw new NotFoundException(`Event ${id} not found`);
    await this.eventRepo.remove(event);
    return { deleted: true };
  }
}