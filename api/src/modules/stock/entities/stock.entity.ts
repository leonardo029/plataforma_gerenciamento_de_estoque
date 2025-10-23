import { ProductEntity } from 'src/modules/product/entities';
import { StockLocationEntity } from 'src/modules/stock-location/entities';
import { SupplierEntity } from 'src/modules/supplier/entities';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('stocks')
@Unique('un_stc_product_batch', ['product_id', 'batch'])
@Check('chk_stc_cost_price', 'cost_price >= 0')
@Check('chk_stc_sale_price', 'sale_price >= 0')
@Check('chk_stc_stock_quantity', 'stock_quantity >= 0')
export class StockEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_product', type: 'uuid' })
  product_id: string;

  @Column({ type: 'varchar', length: 45 })
  batch: string;

  @Column({ type: 'timestamptz' })
  expiration_date: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  cost_price: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  sale_price: number;

  @Column({ name: 'id_supplier', type: 'uuid' })
  supplier_id: string;

  @Column({ type: 'integer' })
  stock_quantity: number;

  @Column({
    name: 'id_stock_location',
    type: 'uuid',
    nullable: true,
  })
  stock_location_id: string;

  @Column({ name: 'is_activated', type: 'boolean', default: false })
  isActivated: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => SupplierEntity, { nullable: false })
  @JoinColumn({ name: 'id_supplier' })
  supplier: SupplierEntity;

  @ManyToOne(() => StockLocationEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_stock_location' })
  stockLocation: StockLocationEntity;

  @ManyToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'id_product' })
  product: ProductEntity;
}
