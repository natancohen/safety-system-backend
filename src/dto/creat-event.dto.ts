import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { EventRightColumnDto } from './event-rightColumn.dto';
import { EventMiddleColumnDto } from './event-middleColumn.dto';
import { EventFourthColumnDto } from './event-fourthColumn.dto';
import { EventLeftColumnDto } from './event-leftColumn.dto';

export class CreateEventDto {
  @ValidateNested()
  @Type(() => EventRightColumnDto)
  rightColumn!: EventRightColumnDto;

  @ValidateNested()
  @Type(() => EventMiddleColumnDto)
  middleColumn!: EventMiddleColumnDto;

  @ValidateNested()
  @Type(() => EventFourthColumnDto)
  fourthColumn!: EventFourthColumnDto;

  @ValidateNested()
  @Type(() => EventLeftColumnDto)
  leftColumn!: EventLeftColumnDto;
}
