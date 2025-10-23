import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableSuppliers1760119761674 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'suppliers',
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
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'id_address',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_contact',
            type: 'uuid',
            isNullable: false,
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
        foreignKeys: [
          {
            name: 'fk_spp_id_address',
            columnNames: ['id_address'],
            referencedColumnNames: ['id'],
            referencedTableName: 'addresses',
          },
          {
            name: 'fk_spp_id_contact',
            columnNames: ['id_contact'],
            referencedColumnNames: ['id'],
            referencedTableName: 'contacts',
          },
        ],
      }),
      true,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('suppliers', true, true);
  }
}
