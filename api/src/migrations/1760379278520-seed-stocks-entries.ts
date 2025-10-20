import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedStocksEntries1760379278520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO stock_entries (quantity_input, id_user, id_stock) VALUES
      (100, (SELECT id FROM users WHERE email = 'andre.silva@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteA1')),
      (80, (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteB2')),
      (120, (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteC3')),
      (200, (SELECT id FROM users WHERE email = 'andre.silva@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteD4')),
      (90, (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteE5')),
      (150, (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteF6')),
      (110, (SELECT id FROM users WHERE email = 'andre.silva@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteG7')),
      (95, (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteH8')),
      (75, (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteI9')),
      (60, (SELECT id FROM users WHERE email = 'andre.silva@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteJ10')),
      (130, (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteA2')),
      (60, (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteB3')),
      (50, (SELECT id FROM users WHERE email = 'andre.silva@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteC4')),
      (70, (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteD5')),
      (85, (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteE6'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM stock_entries
      WHERE id_stock IN (
        SELECT id FROM stocks WHERE batch IN (
          'LoteA1', 'LoteB2', 'LoteC3', 'LoteD4', 'LoteE5',
          'LoteF6', 'LoteG7', 'LoteH8', 'LoteI9', 'LoteJ10',
          'LoteA2', 'LoteB3', 'LoteC4', 'LoteD5', 'LoteE6';
        )
      );
    `);
  }
}
