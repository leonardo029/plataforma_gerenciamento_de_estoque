import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableContacts1759933252933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contacts',
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
            name: 'country_code',
            type: 'bigint',
            unsigned: false,
            isNullable: false,
            default: '55',
          },
          {
            name: 'ddd',
            type: 'bigint',
            unsigned: false,
            isNullable: false,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contacts', true);
  }
}
