import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Applications {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: false, unique: true })
  package: string;

  @Column({ nullable: false, unique: false })
  name: string;

  @Column({ nullable: true, default: null })
  category: string;

  @Column({ nullable: true, default: '', type:'text' })
  description: string;

  @Column({ nullable: true, default: '' })
  iconUrl: string;

  @Column({ nullable: true, default: '' })
  trailerUrl: string;

  @Column({ nullable: true, default: '', type:'text' })
  screenshotUrlList: string;
}
