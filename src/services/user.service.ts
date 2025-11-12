import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const entity = this.userRepo.create(user);
    return await this.userRepo.save(entity);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<User>): Promise<User> {
    const exists = await this.userRepo.findOne({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`User ${id} not found`);
    }
    const merged = this.userRepo.merge(exists, dto);
    return await this.userRepo.save(merged);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const exists = await this.userRepo.findOne({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`User ${id} not found`);
    }
    await this.userRepo.remove(exists);
    return { deleted: true };
  }

  async getUserTheme(id: number): Promise<{ theme: string }> {
    const user = await this.userRepo.findOne({ where: { id } });
    return { theme: user?.theme ?? 'light' };
  }

  async updateUserTheme(id: number, theme: string): Promise<{ theme: string }> {
    const res: UpdateResult = await this.userRepo.update(id, { theme });
    if (!res.affected) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return { theme };
  }
}
