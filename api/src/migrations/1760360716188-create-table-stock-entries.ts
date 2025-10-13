import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableStockEntries1760360716188
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stock_entries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'quantity_input',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'id_user',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_stock',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
        checks: [
          {
            name: 'chk_se_quantity_input',
            expression: 'quantity_input > 0',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_se_id_stock',
            columnNames: ['id_stock'],
            referencedColumnNames: ['id'],
            referencedTableName: 'stocks',
          },
          {
            name: 'fk_se_id_user',
            columnNames: ['id_user'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stock_entries', true, true);
  }
}
