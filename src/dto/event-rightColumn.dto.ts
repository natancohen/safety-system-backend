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
  date!: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsString()
  text!: string;

  @IsString()
  unitActivityOptions!: string;

  @IsString()
  activityOptions!: string;

  @IsString()
  categoryOptions!: string;

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
