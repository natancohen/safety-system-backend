import { IsString, IsOptional } from 'class-validator';

export class EventFourthColumnDto {
  @IsOptional()
  @IsString()
  investigation?: string;

  @IsOptional()
  @IsString()
  recommendations?: string;
}
