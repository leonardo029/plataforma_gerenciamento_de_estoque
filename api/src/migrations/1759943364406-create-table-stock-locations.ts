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
          { name: 'id_shelves', type: 'uuid', isNullable: false },
          { name: 'id_corridors', type: 'uuid', isNullable: false },
          { name: 'id_sections', type: 'uuid', isNullable: false },
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
            name: 'fk_sl_id_shelves',
            columnNames: ['id_shelves'],
            referencedColumnNames: ['id'],
            referencedTableName: 'shelves',
          },
          {
            name: 'fk_sl_id_corridors',
            columnNames: ['id_corridors'],
            referencedColumnNames: ['id'],
            referencedTableName: 'corridors',
          },
          {
            name: 'fk_sl_id_sections',
            columnNames: ['id_sections'],
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
