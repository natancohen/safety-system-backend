import {
  Controller,
  UseInterceptors,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UploadedFile,
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
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateEventDto,
  ) {
    const imageUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.eventService.create({ ...dto, imageUrl });
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateEventDto>) {
    return this.eventService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventService.remove(id);
  }
}