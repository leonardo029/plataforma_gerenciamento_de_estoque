import { BrandEntity } from 'src/modules/brand/entities';
import { CategoryEntity } from 'src/modules/category/entities';
import { NutritionalInformationEntity } from 'src/modules/nutritional-information/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity('products')
@Unique('un_prd_identification_code', ['identificationCode'])
@Unique('un_prd_name_id_brand', ['name', 'idBrand'])
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 45, name: 'identification_code' })
  identificationCode: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'id_brand', type: 'uuid' })
  idBrand: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.id)
  @JoinColumn({ name: 'id_brand' })
  brand: BrandEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({ name: 'id_category' })
  category: CategoryEntity;

  @Column({ name: 'id_category', type: 'uuid' })
  idCategory: string;

  @OneToOne(() => NutritionalInformationEntity)
  @JoinColumn({ name: 'id_nutritional_information' })
  nutritionalInformation: NutritionalInformationEntity;

  @Column({ type: 'varchar', length: 45, name: 'unit_of_measurement' })
  unitOfMeasurement: string;

  @Column({ name: 'is_activated', type: 'boolean', default: true })
  isActivated: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
