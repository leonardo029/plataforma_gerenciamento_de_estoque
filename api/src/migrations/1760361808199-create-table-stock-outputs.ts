import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableStockOutputs1760361808199
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stock_outputs',
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
            name: 'output_quantity',
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
            name: 'chk_so_output_quantity',
            expression: 'output_quantity > 0',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_so_id_stock',
            columnNames: ['id_stock'],
            referencedColumnNames: ['id'],
            referencedTableName: 'stocks',
          },
          {
            name: 'fk_so_id_user',
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
    await queryRunner.dropTable('stock_outputs', true, true);
  }
}
