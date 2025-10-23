import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCorridors1760372673337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO corridors (name) VALUES
      ('COR01'),
      ('COR02'),
      ('COR03'),
      ('COR04'),
      ('COR05'),
      ('COR06'),
      ('COR07'),
      ('COR08'),
      ('COR09'),
      ('COR10'),
      ('COR11'),
      ('COR12'),
      ('COR13'),
      ('COR14'),
      ('COR15'),
      ('COR16'),
      ('COR17'),
      ('COR18'),
      ('COR19'),
      ('COR20'),
      ('COR21'),
      ('COR22'),
      ('COR23'),
      ('COR24'),
      ('COR25'),
      ('COR26'),
      ('COR27'),
      ('COR28'),
      ('COR29'),
      ('COR30');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM corridors WHERE name IN (
      ('COR01'),
      ('COR02'),
      ('COR03'),
      ('COR04'),
      ('COR05'),
      ('COR06'),
      ('COR07'),
      ('COR08'),
      ('COR09'),
      ('COR10'),
      ('COR11'),
      ('COR12'),
      ('COR13'),
      ('COR14'),
      ('COR15'),
      ('COR16'),
      ('COR17'),
      ('COR18'),
      ('COR19'),
      ('COR20'),
      ('COR21'),
      ('COR22'),
      ('COR23'),
      ('COR24'),
      ('COR25'),
      ('COR26'),
      ('COR27'),
      ('COR28'),
      ('COR29'),
      ('COR30');
      );
    `);
  }
}
