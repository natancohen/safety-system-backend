import { IsString, IsNumber, IsOptional } from 'class-validator';

export class EventMiddleColumnDto {
  @IsOptional()
  @IsString()
  eventFactorOptions?: string;

  @IsString()
  eventResultOptions!: string;

  @IsString()
  eventSeverity!: string;

  @IsString()
  eventOutcomeByCategory!: string;

  @IsOptional()
  @IsString()
  damageType?: string;
}

export class CasualtyDto {
  @IsString()
  severity!: string;

  @IsNumber()
  count!: number;
}
