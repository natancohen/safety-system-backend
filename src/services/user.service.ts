import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(user: Partial<User>): Promise<User> {
    return this.userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async getUserTheme(userId: number): Promise<{ theme: string }> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    return { theme: user?.theme || 'light' };
  }

  async updateUserTheme(
    userId: number,
    theme: string,
  ): Promise<{ theme: string }> {
    await this.userRepo.update(userId, { theme });
    return { theme };
  }
}
