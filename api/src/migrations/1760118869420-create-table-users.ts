import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1760118869420 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'password',
            type: 'varchar',
            length: '255',
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
        uniques: [
          {
            name: 'un_usr_email',
            columnNames: ['email'],
          },
        ],
        foreignKeys: [
          {
            name: 'fk_usr_id_address',
            columnNames: ['id_address'],
            referencedColumnNames: ['id'],
            referencedTableName: 'addresses',
          },
          {
            name: 'fk_usr_id_contact',
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
    await queryRunner.dropTable('users', true, true);
  }
}
