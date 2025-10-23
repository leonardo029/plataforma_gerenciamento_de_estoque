import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableStockTransactions1760360716188
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stock_transactions',
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
            name: 'quantity',
            type: 'integer',
            isNullable: true,
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
            name: 'action',
            type: 'enum',
            enumName: 'action_st_enum',
            enum: ['I', 'O', 'U', 'D'],
            isNullable: false,
            //Enum types: INPUT, OUTPUT, UPDATE and DELETE
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
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
            name: 'chk_st_quantity',
            expression: 'quantity > 0',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_st_id_stock',
            columnNames: ['id_stock'],
            referencedColumnNames: ['id'],
            referencedTableName: 'stocks',
          },
          {
            name: 'fk_st_id_user',
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
    await queryRunner.dropTable('stock_transactions', true, true);
  }
}
