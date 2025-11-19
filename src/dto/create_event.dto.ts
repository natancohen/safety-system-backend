import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { EventRightColumnDto } from './event_right_column.dto';
import { EventMiddleColumnDto } from './event_middle_column.dto';
import { EventFourthColumnDto } from './event_fourth_column.dto';
import { EventLeftColumnDto } from './event_left_olumn.dto';

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
