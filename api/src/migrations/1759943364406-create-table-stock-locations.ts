import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableStockLocations1759943364406
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stock_locations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'id_shelf', type: 'uuid', isNullable: false },
          { name: 'id_corridor', type: 'uuid', isNullable: false },
          { name: 'id_section', type: 'uuid', isNullable: false },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
        uniques: [
          {
            name: 'un_sl_shl_crr_sct',
            columnNames: ['id_shelves', 'id_corridors', 'id_sections'],
          },
        ],
        foreignKeys: [
          {
            name: 'fk_sl_id_shelf',
            columnNames: ['id_shelf'],
            referencedColumnNames: ['id'],
            referencedTableName: 'shelves',
          },
          {
            name: 'fk_sl_id_corridor',
            columnNames: ['id_corridor'],
            referencedColumnNames: ['id'],
            referencedTableName: 'corridors',
          },
          {
            name: 'fk_sl_id_section',
            columnNames: ['id_section'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sections',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stock_locations', true, true);
  }
}
