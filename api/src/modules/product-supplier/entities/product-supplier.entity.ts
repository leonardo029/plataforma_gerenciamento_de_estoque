import { ProductEntity } from 'src/modules/product/entities';
import { SupplierEntity } from 'src/modules/supplier/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity('product_suppliers')
@Unique('un_ps_supplier_product', ['supplier_id', 'product_id'])
export class ProductSupplierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_supplier', type: 'uuid' })
  supplier_id: string;

  @Column({ name: 'id_product', type: 'uuid' })
  product_id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => SupplierEntity, { nullable: false })
  @JoinColumn({ name: 'id_supplier' })
  supplier: SupplierEntity;

  @ManyToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'id_product' })
  product: ProductEntity;
}
