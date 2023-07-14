import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  full_time: boolean;

  @CreateDateColumn({ type: "timestamptz", precision: 3 })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz", precision: 3 })
  updated_at: Date;
}
