import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProducts1760116849327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
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
            length: '150',
            isNullable: false,
          },
          {
            name: 'identification_code',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'id_brand',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_category',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_nutritional_information',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'unit_of_measurement',
            type: 'varchar',
            length: '45',
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
            name: 'un_prd_identification_code',
            columnNames: ['identification_code'],
          },
          {
            name: 'un_prd_name_id_brand',
            columnNames: ['name', 'id_brand'],
          },
        ],
        foreignKeys: [
          {
            name: 'fk_prd_id_brand',
            columnNames: ['id_brand'],
            referencedColumnNames: ['id'],
            referencedTableName: 'brands',
          },
          {
            name: 'fk_prd_id_category',
            columnNames: ['id_category'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
          },
          {
            name: 'fk_prd_id_nutritional_information',
            columnNames: ['id_nutritional_information'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nutritional_informations',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products', true, true);
  }
}
