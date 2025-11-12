import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class EventFourthColumnDto {
  @IsOptional()
  @IsString()
  recommendations?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  costAmount?: number;
}
