import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { StateEntity } from '../../state/entities/state.entity';

@Entity('cities')
@Unique('un_cdd_siafi_id', ['siafi_id'])
export class CityEntity {
  @PrimaryColumn({ type: 'int' })
  ibge_code: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'bool' })
  capital: boolean;

  @Column({ type: 'int' })
  idstate_code: number;

  @ManyToOne(() => StateEntity)
  @JoinColumn({ name: 'idstate_code', referencedColumnName: 'state_code' })
  state: StateEntity;

  @Column({ type: 'varchar', length: 4 })
  siafi_id: string;

  @Column({ type: 'int' })
  ddd: number;

  @Column({ type: 'varchar', length: 32 })
  time_zone: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
