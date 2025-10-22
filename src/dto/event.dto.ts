import {
  IsString,
  MaxLength,
  IsDateString,
  Validate,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';
import { IsNotFutureDate } from '../validators/is-not-future-date';

export class CreateEventDto {
  @IsString()
  @MaxLength(100)
  unitName!: string;

  @IsDateString()
  @Validate(IsNotFutureDate)
  date!: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsString()
  category!: string;

  @IsString()
  eventSeverity!: string;

  @IsString()
  eventOutcome!: string;

  @IsOptional()
  @IsString()
  damageType?: string;

  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  locationDescription?: string;

  @IsOptional()
  @IsString()
  weather?: string;

  @IsString()
  @MaxLength(800)
  text!: string;

  @IsString()
  unitActivityType!: string;

  @IsString()
  activityType!: string;

  @IsOptional()
  @IsString()
  investigation?: string;

  @IsOptional()
  coordinates?: {
    latitude: string;
    longitude: string;
  };

  @IsOptional()
  @IsArray()
  casualties?: Array<{
    severity: string;
    count: number;
  }>;

  @IsOptional()
  @IsString()
  subSubCategoryOptions?: string;

  @IsOptional()
  @IsString()
  recommendations?: string;

  @IsOptional()
  @IsNumber()
  costAmount?: number;

  @IsOptional()
  @IsString()
  categorySubOptions?: string;

  @IsOptional()
  @IsString()
  subCategoryOptions?: string;

  @IsOptional()
  @IsString()
  eventFactor?: string;
}
