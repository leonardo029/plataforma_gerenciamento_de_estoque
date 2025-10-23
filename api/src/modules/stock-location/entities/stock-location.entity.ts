import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ShelfEntity } from 'src/modules/shelf/entities';
import { CorridorEntity } from 'src/modules/corridor/entities';
import { SectionEntity } from 'src/modules/section/entities';

@Entity('stock_locations')
@Unique('un_sl_shl_crr_sct', ['shelf_id', 'corridor_id', 'section_id'])
export class StockLocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_shelf', type: 'uuid' })
  shelf_id: string;

  @Column({ name: 'id_corridor', type: 'uuid' })
  corridor_id: string;

  @Column({ name: 'id_section', type: 'uuid' })
  section_id: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => ShelfEntity, { nullable: false })
  @JoinColumn({ name: 'id_shelf' })
  shelf: ShelfEntity;

  @ManyToOne(() => CorridorEntity, { nullable: false })
  @JoinColumn({ name: 'id_corridor' })
  corridor: CorridorEntity;

  @ManyToOne(() => SectionEntity, { nullable: false })
  @JoinColumn({ name: 'id_section' })
  section: SectionEntity;
}
