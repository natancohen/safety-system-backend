import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type EventStatus = 'בטיפול' | 'טופל';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  // ——— Right column ———
  @Column()
  unitName!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column({ nullable: true })
  time?: string;

  @Column()
  text!: string;

  @Column()
  unitActivityOptions!: string;

  @Column()
  activityOptions!: string;

  @Column()
  categoryOptions!: string;

  @Column({ nullable: true })
  categorySubOptions?: string;

  @Column({ nullable: true })
  subCategoryOptions?: string;

  @Column({ nullable: true })
  subSubCategoryOptions?: string;

  // ——— Middle column ———
  @Column({ nullable: true })
  eventFactorOptions?: string;

  @Column()
  eventResultOptions!: string;

  @Column()
  eventSeverity!: string;

  @Column()
  eventOutcomeByCategory!: string;

  @Column({ nullable: true })
  damageType?: string;

  // ——— Left column ———
  @Column()
  location!: string;

  @Column({ nullable: true })
  locationDescription?: string;

  @Column({ nullable: true })
  weather?: string;

  // ב-SQLite סוג מספרי בטוח: REAL
  @Column({ type: 'real', nullable: true })
  latitude?: number;

  @Column({ type: 'real', nullable: true })
  longitude?: number;

  // ——— Fourth column ———
  @Column({ nullable: true })
  recommendations?: string;

  @Column({ type: 'real', nullable: true })
  costAmount?: number;

  // ——— Status ———
  @Column({ type: 'varchar', default: 'בטיפול' })
  status: EventStatus;
}
