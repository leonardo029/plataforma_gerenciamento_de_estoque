import { AddressEntity } from 'src/modules/address/entities';
import { ContactEntity } from 'src/modules/contact/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoleType } from '../types';

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

  @Column({ name: 'id_address', type: 'uuid' })
  idAddress: string;

  @Column({ name: 'id_contact', type: 'uuid' })
  idContact: string;

  @Column({ name: 'is_activated', type: 'boolean', default: false })
  isActivated: boolean;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'id_address' })
  address: AddressEntity;

  @OneToOne(() => ContactEntity)
  @JoinColumn({ name: 'id_contact' })
  contact: ContactEntity;

  @Column({
    type: 'enum',
    enum: UserRoleType,
  })
  role: UserRoleType;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
