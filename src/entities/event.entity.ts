import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unitName: string;

  @Column()
  date: string;

  @Column({ nullable: true })
  time: string;

  @Column()
  category: string;

  @Column()
  eventSeverity: string;

  @Column()
  eventOutcome: string;

  @Column({ nullable: true })
  damageType: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  locationDescription: string;

  @Column({ nullable: true })
  weather: string;

  @Column({ type: 'text' })
  text: string;

  @Column()
  unitActivityType: string;

  @Column()
  activityType: string;

  @Column({ nullable: true })
  investigation: string;

  @Column({ type: 'simple-json' })
  coordinates: {
    latitude: string;
    longitude: string;
  };

  @Column({ type: 'simple-json', nullable: true })
  casualties: Array<{
    severity: string;
    count: number;
  }>;

  @Column({ nullable: true })
  subSubCategoryOptions: string;

  @Column({ type: 'text', nullable: true })
  recommendations: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  costAmount: number;

  @Column({ nullable: true })
  categorySubOptions: string;

  @Column({ nullable: true })
  subCategoryOptions: string;

  @Column({ nullable: true })
  eventFactor: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 'בטיפול' })
  status: string;

  @Column({ nullable: true })
  imageUrl: string;
}