import { AddressEntity } from 'src/modules/address/entities';
import { ContactEntity } from 'src/modules/contact/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('suppliers')
export class SupplierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ name: 'is_activated', type: 'boolean', default: false })
  isActivated: boolean;

  @OneToOne(() => ContactEntity)
  @JoinColumn({ name: 'id_contact' })
  contact: ContactEntity;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'id_address' })
  address: AddressEntity;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
