import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StreetTypeEntity } from './street-type.entity';
import { CityEntity } from 'src/modules/city/entities';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  street: string;

  @ManyToOne(() => StreetTypeEntity)
  @JoinColumn({ name: 'id_street_type' })
  streetType: StreetTypeEntity;

  @Column({ name: 'id_street_type', type: 'uuid' })
  idStreetType: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  complement?: string;

  @Column({ type: 'varchar', length: 8 })
  cep: string;

  @Column({ type: 'integer', default: -1, nullable: true })
  number?: number;

  @Column({ type: 'varchar', length: 255 })
  neighborhood: string;

  @ManyToOne(() => CityEntity)
  @JoinColumn({ name: 'id_city', referencedColumnName: 'ibge_code' })
  city: CityEntity;

  @Column({ name: 'id_city', type: 'integer' })
  idCity: number;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
