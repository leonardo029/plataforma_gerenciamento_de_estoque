import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSections1760372383357 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO sections (name) VALUES
      ('SEC01'),
      ('SEC02'),
      ('SEC03'),
      ('SEC04'),
      ('SEC05'),
      ('SEC06'),
      ('SEC07'),
      ('SEC08'),
      ('SEC09'),
      ('SEC10'),
      ('SEC11'),
      ('SEC12'),
      ('SEC13'),
      ('SEC14'),
      ('SEC15');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM sections WHERE name IN (
      ('SEC01'),
      ('SEC02'),
      ('SEC03'),
      ('SEC04'),
      ('SEC05'),
      ('SEC06'),
      ('SEC07'),
      ('SEC08'),
      ('SEC09'),
      ('SEC10'),
      ('SEC11'),
      ('SEC12'),
      ('SEC13'),
      ('SEC14'),
      ('SEC15');
      );
    `);
  }
}
