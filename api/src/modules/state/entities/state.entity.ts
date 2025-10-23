import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity('states')
@Unique('un_est_name', ['name'])
@Unique('un_est_acronym', ['acronym'])
export class StateEntity {
  @PrimaryColumn({ type: 'int' })
  state_code: number;

  @Column({ type: 'char', length: 2 })
  acronym: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'varchar', length: 12 })
  region: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
