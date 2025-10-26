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
import { CreateEventDto } from '../dto/creat-event.dto';
import { Event } from '../entities/event.entity';
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
  ): Promise<Event> {
    const imageUrl = file ? `/uploads/${file.filename}` : undefined;

    const eventData: Partial<Event> = {
      ...dto.rightColumn,
      ...dto.middleColumn,
      ...dto.leftColumn,
      ...dto.fourthColumn,
      date: new Date(dto.rightColumn.date),
      imageUrl,
    };

    return await this.eventService.create(eventData);
  }

  @Get()
  async findAll(): Promise<Event[]> {
    return await this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Event> {
    return await this.eventService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: Partial<CreateEventDto>,
  ): Promise<Event> {
    const updatedData: Partial<Event> = {
      ...dto.rightColumn,
      ...dto.middleColumn,
      ...dto.leftColumn,
      ...dto.fourthColumn,
      date: dto.rightColumn?.date ? new Date(dto.rightColumn.date) : undefined,
    };

    return await this.eventService.update(id, updatedData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return this.eventService.remove(id);
  }
}
