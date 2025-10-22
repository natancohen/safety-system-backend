import {
  Controller,
  UseInterceptors,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/event.dto';
import { extname } from 'path';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateEventDto,
  ): Promise<CreateEventDto> {
    const imageUrl = file ? `/uploads/${file.filename}` : undefined;

    const eventData = {
      ...dto,
      date: new Date(dto.date), // המרה מ־string ל־Date
      imageUrl,
    };

    const event = await this.eventService.create(eventData);
    return {
      ...event,
      date: event.date.toISOString(),
    };
  }

  @Get()
  async findAll(): Promise<CreateEventDto[]> {
    const events = await this.eventService.findAll();
    return events.map((event) => ({
      ...event,
      date: event.date.toISOString(),
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CreateEventDto> {
    const event = await this.eventService.findOne(id);
    return {
      ...event,
      date: event.date.toISOString(),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: Partial<CreateEventDto>,
  ): Promise<CreateEventDto> {
    const updatedData = {
      ...dto,
      date: dto.date ? new Date(dto.date) : undefined, // המרה אם קיים
    };

    const event = await this.eventService.update(id, updatedData);
    return {
      ...event,
      date: event.date.toISOString(),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return this.eventService.remove(id);
  }
}
