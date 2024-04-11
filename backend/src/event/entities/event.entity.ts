import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StateEvent } from '../interfaces';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  address: string;
  @Column({ type: 'timestamptz' })
  startTime: Date;
  @Column('int')
  ability: number;
  @Column({
    type: 'enum',
    enum: StateEvent,
    default: StateEvent.CREATED,
  })
  state: StateEvent;
  @ManyToOne(() => User, (user) => user.event, { eager: true })
  artist: User;
}
