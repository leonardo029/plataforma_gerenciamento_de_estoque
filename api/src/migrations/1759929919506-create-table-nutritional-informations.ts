import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableNutritionalInformations1759929919506
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'nutritional_informations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'portion', type: 'varchar', length: '20', isNullable: false },
          { name: 'carbohydrate', type: 'integer', isNullable: true },
          { name: 'protein', type: 'integer', isNullable: true },
          { name: 'total_fat', type: 'integer', isNullable: true },
          { name: 'fiber', type: 'integer', isNullable: true },
          {
            name: 'is_allergenic',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('nutritional_informations', true);
  }
}
