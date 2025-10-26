import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async create(dto: Partial<Event>): Promise<Event> {
    const event = this.eventRepo.create(dto);
    return await this.eventRepo.save(event);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepo.find();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }
    return event;
  }

  async update(id: number, dto: Partial<Event>): Promise<Event> {
    const event = await this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    const updated = this.eventRepo.merge(event, dto);

    if (dto.date) {
      updated.date = new Date(dto.date);
    }

    return await this.eventRepo.save(updated);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const event = await this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }
    await this.eventRepo.remove(event);
    return { deleted: true };
  }
}
