import { IsString, IsOptional, IsArray } from 'class-validator';

export class EventMiddleColumnDto {
  @IsOptional()
  @IsString()
  eventFactor?: string;

  @IsString()
  eventResult!: string;

  @IsString()
  eventSeverity!: string;

  @IsString()
  eventOutcome!: string;

  @IsOptional()
  @IsString()
  damageType?: string;

  @IsOptional()
  @IsArray()
  casualties?: Array<{
    severity: string;
    count: number;
  }>;
}
