import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProductSuppliers1760121525898
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_suppliers',
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
            name: 'id_supplier',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_product',
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
        uniques: [
          {
            name: 'un_ps_supplier_product',
            columnNames: ['id_supplier', 'id_product'],
          },
        ],
        foreignKeys: [
          {
            name: 'fk_ps_id_product',
            columnNames: ['id_product'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
          },
          {
            name: 'fk_ps_id_supplier',
            columnNames: ['id_supplier'],
            referencedColumnNames: ['id'],
            referencedTableName: 'suppliers',
          },
        ],
      }),
      true,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_suppliers', true, true);
  }
}
