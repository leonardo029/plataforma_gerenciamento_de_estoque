import { Address } from 'src/modules/address/entities';
import { Contact } from 'src/modules/contact/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('users')
@Unique('un_usr_email', ['email'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'id_address' })
  address: Address;

  @OneToOne(() => Contact)
  @JoinColumn({ name: 'id_contact' })
  contact: Contact;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
