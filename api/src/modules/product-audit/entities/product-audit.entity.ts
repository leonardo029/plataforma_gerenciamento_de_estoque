import { ProductEntity } from 'src/modules/product/entities';
import { UserEntity } from 'src/modules/user/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ActionType } from '../types/action-type';

@Entity('product_audit')
export class ProductAuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'id_product' })
  product: ProductEntity;

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
