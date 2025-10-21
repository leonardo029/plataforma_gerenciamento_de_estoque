import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { ActionType } from '../types';
import { StockEntity } from 'src/modules/stock/entities';
import { UserEntity } from 'src/modules/user/entities';

@Entity('stock_transactions')
@Check('chk_st_quantity', 'quantity > 0')
export class StockTransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ name: 'id_user', type: 'uuid' })
  user_id: string;

  @Column({ name: 'id_stock', type: 'uuid' })
  stock_id: string;

  @Column({
    type: 'enum',
    enum: ActionType,
    enumName: 'action_st_enum',
  })
  action: ActionType;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'id_user' })
  user: UserEntity;

  @ManyToOne(() => StockEntity, { nullable: false })
  @JoinColumn({ name: 'id_stock' })
  stock: StockEntity;
}
