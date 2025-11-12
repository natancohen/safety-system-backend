import { IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsIn(['בטיפול', 'טופל'])
  status!: 'בטיפול' | 'טופל';
}
