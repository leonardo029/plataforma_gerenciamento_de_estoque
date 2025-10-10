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
    await queryRunner.dropTable('stocks', true, true);
  }
}
