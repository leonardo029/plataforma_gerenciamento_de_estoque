import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedNutritionalInformations1760366031769
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO nutritional_informations (portion, carbohydrate, protein, total_fat, fiber, is_allergenic) VALUES
        ('100g', 29, 10, 18, 5, true),
        ('100g', 54, 0, 20, 9, true),
        ('100g', 19, 16, 13, 7, false),
        ('100g', 66, 3, 10, 5, true),
        ('100g', 20, 8, 14, 7, true),
        ('100g', 12, 2, 1, 3, false),
        ('100g', 70, 5, 4, 2, false),
        ('100g', 33, 6, 7, 8, true),
        ('100g', 45, 11, 5, 6, false),
        ('100g', 25, 7, 9, 4, true);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM nutritional_informations WHERE
        (portion = '100g' AND carbohydrate = 29 AND protein = 10 AND total_fat = 18 AND fiber = 5 AND is_allergenic = true) OR
        (portion = '100g' AND carbohydrate = 54 AND protein = 0 AND total_fat = 20 AND fiber = 9 AND is_allergenic = true) OR
        (portion = '100g' AND carbohydrate = 19 AND protein = 16 AND total_fat = 13 AND fiber = 7 AND is_allergenic = false) OR
        (portion = '100g' AND carbohydrate = 66 AND protein = 3 AND total_fat = 10 AND fiber = 5 AND is_allergenic = true) OR
        (portion = '100g' AND carbohydrate = 20 AND protein = 8 AND total_fat = 14 AND fiber = 7 AND is_allergenic = true) OR
        (portion = '100g' AND carbohydrate = 12 AND protein = 2 AND total_fat = 1 AND fiber = 3 AND is_allergenic = false) OR
        (portion = '100g' AND carbohydrate = 70 AND protein = 5 AND total_fat = 4 AND fiber = 2 AND is_allergenic = false) OR
        (portion = '100g' AND carbohydrate = 33 AND protein = 6 AND total_fat = 7 AND fiber = 8 AND is_allergenic = true) OR
        (portion = '100g' AND carbohydrate = 45 AND protein = 11 AND total_fat = 5 AND fiber = 6 AND is_allergenic = false) OR
        (portion = '100g' AND carbohydrate = 25 AND protein = 7 AND total_fat = 9 AND fiber = 4 AND is_allergenic = true);
    `);
  }
}
