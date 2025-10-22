import { IsString, IsOptional } from 'class-validator';

export class EventLeftColumnDto {
  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  locationDescription?: string;

  @IsOptional()
  @IsString()
  weather?: string;

  @IsOptional()
  coordinates?: {
    latitude: string;
    longitude: string;
  };
}
