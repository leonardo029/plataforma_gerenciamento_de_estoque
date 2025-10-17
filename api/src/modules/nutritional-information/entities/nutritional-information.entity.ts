import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('nutritional_informations')
export class NutritionalInformationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  portion: string;

  @Column({ type: 'integer', nullable: true })
  carbohydrate?: number;

  @Column({ type: 'integer', nullable: true })
  protein?: number;

  @Column({ type: 'integer', name: 'total_fat', nullable: true })
  totalFat?: number;

  @Column({ type: 'integer', nullable: true })
  fiber?: number;

  @Column({ type: 'boolean', name: 'is_allergenic', default: false })
  isAllergenic: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
