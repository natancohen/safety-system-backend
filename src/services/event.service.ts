import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';

export interface FlatEvent {
  id: number;
  unitName: string;
  date: string;
  time: string | null;
  text: string;
  unitActivityOptions: string;
  activityOptions: string;
  categoryOptions: string;
  categorySubOptions: string | null;
  subCategoryOptions: string | null;
  subSubCategoryOptions: string | null;
  eventFactorOptions: string | null;
  eventResultOptions: string;
  eventSeverity: string;
  eventOutcomeByCategory: string;
  damageType: string | null;
  location: string;
  locationDescription: string | null;
  weather: string | null;
  latitude: number | null;
  longitude: number | null;
  recommendations: string | null;
  costAmount: number | null;
  status: string;
}

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  // ממפה ישות לאובייקט “שטוח” עבור הפרונט
  private toFlat(e: Event): FlatEvent {
    return {
      id: e.id,
      unitName: e.unitName,
      date: e.date,
      time: e.time ?? null,
      text: e.text,
      unitActivityOptions: e.unitActivityOptions,
      activityOptions: e.activityOptions,
      categoryOptions: e.categoryOptions,
      categorySubOptions: e.categorySubOptions ?? null,
      subCategoryOptions: e.subCategoryOptions ?? null,
      subSubCategoryOptions: e.subSubCategoryOptions ?? null,
      eventFactorOptions: e.eventFactorOptions ?? null,
      eventResultOptions: e.eventResultOptions,
      eventSeverity: e.eventSeverity,
      eventOutcomeByCategory: e.eventOutcomeByCategory,
      damageType: e.damageType ?? null,
      location: e.location,
      locationDescription: e.locationDescription ?? null,
      weather: e.weather ?? null,
      latitude: e.latitude ?? null,
      longitude: e.longitude ?? null,
      recommendations: e.recommendations ?? null,
      costAmount: e.costAmount ?? null,
      status: String(e.status),
    };
  }

  async create(dto: Partial<Event>): Promise<Event> {
    const event = this.eventRepo.create(dto);
    return await this.eventRepo.save(event);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepo.find();
  }

  // קריאות “שטוחות” ללא QueryBuilder — מסתמכות על המיפוי ב-Entity
  async findAllFlat(): Promise<FlatEvent[]> {
    const list = await this.eventRepo.find();
    return list.map((e) => this.toFlat(e));
  }

  async findOneFlat(id: number): Promise<FlatEvent | null> {
    const e = await this.eventRepo.findOne({ where: { id } });
    return e ? this.toFlat(e) : null;
  }

  async findOne(id: number): Promise<Event | null> {
    return await this.eventRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<Event>): Promise<Event> {
    const existing = await this.eventRepo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Event ${id} not found`);
    }
    const updated = this.eventRepo.merge(existing, dto);
    return await this.eventRepo.save(updated);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const event = await this.eventRepo.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }
    await this.eventRepo.remove(event);
    return { deleted: true };
  }
}
