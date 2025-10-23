import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  @Get('theme/:id')
  async getTheme(@Param('id') id: string): Promise<{ theme: string }> {
    const userId = parseInt(id, 10);
    return this.userService.getUserTheme(userId);
  }

  @Post('theme')
  async updateTheme(
    @Body() body: { userId: number; theme: string },
  ): Promise<{ theme: string }> {
    return this.userService.updateUserTheme(body.userId, body.theme);
  }
}
