import {
  IsString,
  MaxLength,
  IsDateString,
  Validate,
  IsOptional,
} from 'class-validator';
import { IsNotFutureDate } from '../validators/is-not-future-date';

export class EventRightColumnDto {
  @IsString()
  @MaxLength(100)
  unitName!: string;

  @IsDateString()
  @Validate(IsNotFutureDate)
  date!: Date;

  @IsOptional()
  @IsString()
  time?: string;

  @IsString()
  @MaxLength(800)
  text!: string;

  @IsString()
  unitActivityType!: string;

  @IsString()
  activityType!: string;

  @IsString()
  category!: string;

  @IsOptional()
  @IsString()
  categorySubOptions?: string;

  @IsOptional()
  @IsString()
  subCategoryOptions?: string;

  @IsOptional()
  @IsString()
  subSubCategoryOptions?: string;
}
