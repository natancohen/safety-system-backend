import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

interface RequestWithUser extends Request {
  user: {
    id: number;
  };
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('theme')
  async getTheme(@Req() req: RequestWithUser): Promise<{ theme: string }> {
    const userId = req.user.id;
    return this.userService.getUserTheme(userId);
  }

  @Post('theme')
  async updateTheme(
    @Req() req: RequestWithUser,
    @Body() body: { theme: string },
  ): Promise<{ theme: string }> {
    const userId = req.user.id;
    return this.userService.updateUserTheme(userId, body.theme);
  }
}
