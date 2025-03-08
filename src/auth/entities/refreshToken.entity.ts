import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  accessToken: string;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
