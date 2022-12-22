import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 20 })
  credits: number;

  @Column({ default: 0 })
  extraCredits: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  refreshDate: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
