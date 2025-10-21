import { ProductEntity } from 'src/modules/product/entities';
import { UserEntity } from 'src/modules/user/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ActionType } from '../types/action-type';

@Entity('product_audit')
export class ProductAuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_product', type: 'uuid' })
  idProduct: string;

  @ManyToOne(() => ProductEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_product' })
  product: ProductEntity;

  @Column({ name: 'id_user', type: 'uuid' })
  idUser: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'id_user' })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: ActionType,
    enumName: 'action_enum',
  })
  action: ActionType;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
