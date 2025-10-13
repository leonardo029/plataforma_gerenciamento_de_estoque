import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableAddresses1760115119264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
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
            name: 'street',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'id_street_type',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'cep',
            type: 'varchar',
            length: '8',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'integer',
            isNullable: true,
            default: -1,
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'id_city',
            type: 'integer',
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
            name: 'fk_adr_id_street_type',
            columnNames: ['id_street_type'],
            referencedColumnNames: ['id'],
            referencedTableName: 'street_types',
          },
          {
            name: 'fk_adr_id_city',
            columnNames: ['id_city'],
            referencedColumnNames: ['ibge_code'],
            referencedTableName: 'cities',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('addresses', true, true);
  }
}
