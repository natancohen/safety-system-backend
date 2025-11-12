import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Get('theme/:id')
  async getTheme(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ theme: string }> {
    return this.userService.getUserTheme(id);
  }

  @Post('theme')
  async updateTheme(
    @Body() body: { userId: number; theme: string },
  ): Promise<{ theme: string }> {
    return this.userService.updateUserTheme(body.userId, body.theme);
  }
}
