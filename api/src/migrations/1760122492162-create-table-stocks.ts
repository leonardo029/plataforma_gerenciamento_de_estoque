import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableStocks1760122492162 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stocks',
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
            name: 'id_product',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'batch',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'expiration_date',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'cost_price',
            type: 'numeric',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'sale_price',
            type: 'numeric',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'id_supplier',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'stock_quantity',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'id_stock_location',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'is_activated',
            type: 'boolean',
            default: false,
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
            name: 'chk_stc_cost_price',
            expression: 'cost_price >= 0',
          },
          {
            name: 'chk_stc_sale_price',
            expression: 'sale_price >= 0',
          },
          {
            name: 'chk_stc_stock_quantity',
            expression: 'stock_quantity >= 0',
          },
        ],
        uniques: [
          {
            name: 'un_stc_product_batch',
            columnNames: ['id_product', 'batch'],
          },
        ],
        foreignKeys: [
          {
            name: 'fk_stc_id_supplier',
            columnNames: ['id_supplier'],
            referencedColumnNames: ['id'],
            referencedTableName: 'suppliers',
          },
          {
            name: 'fk_stc_id_stock_location',
            columnNames: ['id_stock_location'],
            referencedColumnNames: ['id'],
            referencedTableName: 'stock_locations',
            onDelete: 'SET NULL',
          },
          {
            name: 'fk_stc_id_product',
            columnNames: ['id_product'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
          },
        ],
      }),
      true,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stocks', true, true);
  }
}
