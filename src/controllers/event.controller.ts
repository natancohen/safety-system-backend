import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { EventService, type FlatEvent } from '../services/event.service';
import { CreateEventDto } from '../dto/create_event.dto';
import { Event } from '../entities/event.entity';
import { UpdateStatusDto } from '../dto/update_status.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll(): Promise<FlatEvent[]> {
    return this.eventService.findAllFlat();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FlatEvent | null> {
    return this.eventService.findOneFlat(id);
  }

  @Post()
  async create(@Body() dto: CreateEventDto): Promise<FlatEvent> {
    const flat = this.flatten(dto);
    const saved = await this.eventService.create(flat);
    const out = await this.eventService.findOneFlat(saved.id);
    // out must exist since we just created it; fallback to basic entity if needed
    return (
      out ??
      ({
        id: saved.id,
        unitName: saved.unitName,
        date: saved.date,
        time: saved.time ?? null,
        text: saved.text,
        unitActivityOptions: saved.unitActivityOptions,
        activityOptions: saved.activityOptions,
        categoryOptions: saved.categoryOptions,
        categorySubOptions: saved.categorySubOptions ?? null,
        subCategoryOptions: saved.subCategoryOptions ?? null,
        subSubCategoryOptions: saved.subSubCategoryOptions ?? null,
        eventFactorOptions: saved.eventFactorOptions ?? null,
        eventResultOptions: saved.eventResultOptions,
        eventSeverity: saved.eventSeverity,
        eventOutcomeByCategory: saved.eventOutcomeByCategory,
        damageType: saved.damageType ?? null,
        location: saved.location,
        locationDescription: saved.locationDescription ?? null,
        weather: saved.weather ?? null,
        latitude: saved.latitude ?? null,
        longitude: saved.longitude ?? null,
        recommendations: saved.recommendations ?? null,
        costAmount: saved.costAmount ?? null,
        status: saved.status as unknown as string,
      } as FlatEvent)
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateEventDto,
  ): Promise<Event> {
    const flat = this.flatten(dto);
    return this.eventService.update(id, flat);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Promise<Event> {
    return this.eventService.update(id, { status: dto.status });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    return this.eventService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File): { url: string } {
    return { url: `/uploads/${file.filename}` };
  }

  private flatten(dto: CreateEventDto): Partial<Event> {
    const r = dto.rightColumn;
    const m = dto.middleColumn;
    const f = dto.fourthColumn;
    const l = dto.leftColumn;

    return {
      // Right column
      unitName: r.unitName,
      date: r.date,
      time: r.time,
      text: r.text,
      unitActivityOptions: r.unitActivityOptions,
      activityOptions: r.activityOptions,
      categoryOptions: r.categoryOptions,
      categorySubOptions: r.categorySubOptions,
      subCategoryOptions: r.subCategoryOptions,
      subSubCategoryOptions: r.subSubCategoryOptions,

      // Middle column
      eventFactorOptions: m.eventFactorOptions,
      eventResultOptions: m.eventResultOptions,
      eventSeverity: m.eventSeverity,
      eventOutcomeByCategory: m.eventOutcomeByCategory,
      damageType: m.damageType,

      // Left column
      location: l.location,
      locationDescription: l.locationDescription,
      weather: l.weather,
      latitude: l.coordinates?.latitude,
      longitude: l.coordinates?.longitude,

      // Fourth column
      recommendations: f.recommendations,
      costAmount: f.costAmount,
    };
  }
}
